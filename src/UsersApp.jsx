import { useReducer, useState } from "react";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { usersReducer } from "./reducers/usersReducer";

const initialUsers = [
    {
        id: 1,
        username: 'Pepe',
        password: '12345',
        email: 'pepe@correo.com'
    }
];

const initialUserForm = {
    username: '',
    password: '',
    email: ''
}

export const UsersApp = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        // console.log(user);
        dispatch({
            type: 'addUser',
            payload: user
        })
    }

    const handlerDeleteUser = (id) => {
        // console.log(id);
        dispatch({
            type: 'deleteUser',
            payload: id
        })
    }

    const handlerUserSelected = (user) => {
        setUserSelected({...user});
    }

    return (
        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    <UserForm
                        initialUserForm={initialUserForm}
                        userSelected={userSelected}
                        handlerAddUser={handlerAddUser} />
                </div>
                <div className="col">
                    {
                        users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema</div>
                            : <UsersList
                                handlerUserSelected={handlerUserSelected}
                                handlerDeleteUser={handlerDeleteUser}
                                users={users} />
                    }
                </div>
            </div>
        </div>
    );
}