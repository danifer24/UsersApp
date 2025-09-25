import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
  {
    id: 1,
    username: "Pepe",
    password: "12345",
    email: "pepe@correo.com",
  },
];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);

  const handlerAddUser = (user) => {
    let type;

    if (user.id === 0) {
      type = "addUser";
    } else {
      type = "updateUser";
    }
    dispatch({
      type,
      payload: user,
    });

    Swal.fire({
      title: user.id === 0 ? "Usuario creado" : "Usuario actualizado",
      text:
        user.id === 0
          ? "El usuario ha sido creado con éxito"
          : "El usuario ha sido actualizado con éxito",
      icon: "success",
    });
  };

  const handlerDeleteUser = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "El usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
  };

  return {
    users,
    userSelected,
    initialUserForm,

    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelected,
  };
};
