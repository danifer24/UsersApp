import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export const findAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const save = async ({ username, email, password }) => {
    return await axios.post(BASE_URL, {
      username,
      email,
      password,
    });
};

export const update = async ({ id, username, email }) => {
    return await axios.put(`${BASE_URL}/${id}`, {
      username,
      email,
      // password: "nothing"
    });
};

export const remove = async (id) => {
  try {
    console.log("Eliminando usuario con id:", id);
    return await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
