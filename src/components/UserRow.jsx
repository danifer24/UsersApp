import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";

export const UserRow = ({ id, username, email, admin }) => {

    const { handlerDeleteUser, handlerUserSelected } = useUsers();
    const { login } = useContext(AuthContext);

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerUserSelected({
                                id,
                                username,
                                email,
                                admin
                            })}
                        >
                            update
                        </button>
                    </td>
                    <td>
                        <NavLink className={"btn btn-secondary btn-sm"} to={"/users/edit/" + id}>
                            update route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handlerDeleteUser(id)}
                        >
                            remove
                        </button>
                    </td>
                </>}
        </tr>
    )
}