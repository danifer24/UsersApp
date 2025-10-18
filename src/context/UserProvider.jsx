import { UserContext } from "./UserContext";
import { useUsers } from "../hooks/useUsers"

export const UserProvider = ({ children }) => {

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
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerDeleteUser,
                handlerUserSelected,
                handlerOpenForm,
                handlerCloseForm
            }
        }>
            { children }
        </UserContext.Provider>
    );
}