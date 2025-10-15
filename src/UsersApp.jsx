import { useReducer } from "react";
import { LoginPage } from "./auth/pages/LoginPage";
import { UsersPage } from "./pages/UsersPage";
import { loginReducer } from "./auth/pages/reducers/loginReducers";
import Swal from "sweetalert2";
import { Navbar } from "./components/layout/Navbar";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
    isAuth: false,
    user: undefined,
}

export const UsersApp = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const handlerLogin = ({ username, password }) => {
        if (username === 'admin' || password === '12345') {
            const user = { username: "admin" };
            dispatch({
                type: "login",
                payload: user,
            });
            sessionStorage.setItem("login", JSON.stringify({
                isAuth: true,
                user,
            }))

        } else {
            Swal.fire("Error de autenticación", "Credenciales incorrectas", "error");
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: "logout",
        });
        sessionStorage.removeItem("login");
    }

    return (
        <>
            {login.isAuth
                ? (
                    <>
                        <Navbar login={login} handlerLogout={handlerLogout}/>
                        <UsersPage />
                    </>
                )
                : <LoginPage handlerLogin={handlerLogin} />
            }
        </>
    );
}