import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { useUsers } from "./hooks/useUsers";

export const UsersApp = () => {

    const {
        users,
        userSelected,
        initialUserForm,

        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelected
    } = useUsers();

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
                    <button
                        className="btn btn-primary my-2">
                        Nuevo Usuario
                    </button>
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