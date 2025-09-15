export const UserRow = ({ id, username, email, handlerDeleteUser, handlerUserSelected }) => {

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handlerUserSelected({
                        id,
                        username,
                        email,
                    })}
                >
                    update
                </button>
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
        </tr>
    )
}