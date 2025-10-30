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
  try {
    return await axios.post(BASE_URL, {
      username,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

export const update = async ({ id, username, email }) => {
  try {
    return await axios.put(`${BASE_URL}/${id}`, {
      username,
      email,
    });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    console.log("Eliminando usuario con id:", id);
    return await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
