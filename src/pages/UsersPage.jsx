import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import "./styles.css";

export const UsersPage = () => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,

        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelected,
        handlerOpenForm,
        handlerCloseForm
    } = useUsers();

    return (
        <>
            {!visibleForm ||
                <UserModalForm
                    userSelected={userSelected}
                    initialUserForm={initialUserForm}
                    handlerAddUser={handlerAddUser}
                    handlerCloseForm={handlerCloseForm} />
            }
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        {visibleForm ||
                            <button
                                className="btn btn-primary my-2"
                                onClick={handlerOpenForm}>
                                Nuevo Usuario
                            </button>}
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
        </>
    );
}