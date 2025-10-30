import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { findAllUsers, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const getUsers = async() => {
    const result = await findAllUsers();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result.data
    });
  }

  const handlerAddUser = async(user) => {

    let response;

    if(user.id === 0){
      response = await save(user)
    }else{
      response = await update(user);
    }

    dispatch({
      type: (user.id === 0) ? "addUser" : "updateUser",
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
  };

  const handlerDeleteUser = (id) => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar este usuario?",
      text: "Cuidado, el usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        dispatch({
          type: "deleteUser",
          payload: id,
        });
        Swal.fire({
          title: "Usuario eliminado",
          text: "El usuario ha sido eliminado",
          icon: "success",
        });
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
  }

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
    getUsers
  };
};
