import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { UsersPage } from "../pages/UsersPage";

export const UserRoutes = ({ login, handlerLogout }) => {

    return (
        <>
            <Navbar login={login} handlerLogout={handlerLogout} />
            <Routes>
                <Route path="users" element={<UsersPage />} />
                <Route path="users/register" element={<RegisterPage handlerAddUser={handlerAddUser} initialUserForm={initialUserForm} />} />
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    );
}