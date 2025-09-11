import { UserRow } from "./UserRow"

export const UsersList = ({ users = [], handlerDeleteUser, handlerUserSelected }) => {

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>update</th>
                    <th>remove</th>
                </tr>

            </thead>

            <tbody>
                {
                    users.map(({id, username, email}) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            handlerDeleteUser={handlerDeleteUser}
                            handlerUserSelected={handlerUserSelected} />
                    ))
                }
            </tbody>
        </table>
    )
}