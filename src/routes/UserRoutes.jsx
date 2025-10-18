import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { UsersPage } from "../pages/UsersPage";
import { useUsers } from "../hooks/useUsers";
import { RegisterPage } from "../pages/RegisterPage";

export const UserRoutes = ({ login, handlerLogout }) => {

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
            <Navbar login={login} handlerLogout={handlerLogout} />
            <Routes>
                <Route path="users" element={<UsersPage
                    users={users}
                    userSelected={userSelected}
                    initialUserForm={initialUserForm}
                    visibleForm={visibleForm}
                    handlerAddUser={handlerAddUser}
                    handlerDeleteUser={handlerDeleteUser}
                    handlerUserSelected={handlerUserSelected}
                    handlerOpenForm={handlerOpenForm}
                    handlerCloseForm={handlerCloseForm} />}
                />
                <Route path="users/register" element={<RegisterPage
                    handlerAddUser={handlerAddUser}
                    initialUserForm={initialUserForm} />}
                />
                <Route path="users/edit/:id" element={<RegisterPage
                    users={users}
                    handlerAddUser={handlerAddUser}
                    initialUserForm={initialUserForm} />} />
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    );
}