import Swal from "sweetalert2";
import { findAllUsers, remove, save, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  initialUserForm,
  addUser,
  deleteUser,
  loadingUsers,
  onCloseForm,
  onOpenForm,
  onUserSelectedForm,
  updateUser,
  loadingError,
} from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
  const { users, userSelected, visibleForm, errors } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { login, handlerLogout } = useAuth();

  const getUsers = async () => {
    try {
      const result = await findAllUsers();
      console.log(result);
      dispatch(loadingUsers(result.data));
    } catch (error) {
      if (error.response && error.response.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }

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
        dispatch(loadingError((error.response.data)));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          dispatch(loadingError({ username: "El username ya existe" }));
        }
        if (error.response.data?.message?.includes("UK_email")) {
          dispatch(loadingError({ email: "El email ya existe" }));
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
          dispatch(deleteUser(id));
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

  const handlerUserSelectedForm = (user) => {
    dispatch(onUserSelectedForm({ ...user }));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };
  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
