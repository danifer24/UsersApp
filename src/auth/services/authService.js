import axios from "axios";

export const loginUser = async ({username, password}) => {
        return await axios.post("http://localhost:8080/login", {
            username,
            password
        });
}