import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { findAllUsers, remove, save, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();
  const { login, handlerLogout } = useContext(AuthContext);

  const getUsers = async () => {
    const result = await findAllUsers();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }

      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });

      Swal.fire({
        title: user.id === 0 ? "Usuario creado" : "Usuario actualizado",
        text:
          user.id === 0
            ? "El usuario ha sido creado con éxito"
            : "El usuario ha sido actualizado con éxito",
        icon: "success",
      });
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          setErrors({ username: "El username ya existe" });
        }
        if (error.response.data?.message?.includes("UK_email")) {
          setErrors({ email: "El email ya existe" });
        }
      } else if (error.response && error.response.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerDeleteUser = (id) => {
    if (!login.isAdmin) return;

    Swal.fire({
      title: "¿Está seguro que desea eliminar este usuario?",
      text: "Cuidado, el usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch({
            type: "deleteUser",
            payload: id,
          });
          Swal.fire({
            title: "Usuario eliminado",
            text: "El usuario ha sido eliminado",
            icon: "success",
          });
        } catch (error) {
          if (error.response && error.response.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerUserSelected = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
    setErrors({});
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
