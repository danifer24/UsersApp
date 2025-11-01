import axios from "axios";

export const loginUser = async ({username, password}) => {
        return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            username,
            password
        });
}