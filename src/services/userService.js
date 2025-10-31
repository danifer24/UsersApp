import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

const config = () => {
  return {
    headers: {
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
};

export const findAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const save = async ({ username, email, password, admin }) => {
  return await axios.post(
    BASE_URL,
    {
      username,
      email,
      password,
      admin
    },
    config()
  );
};

export const update = async ({ id, username, email, admin }) => {
  return await axios.put(
    `${BASE_URL}/${id}`,
    {
      username,
      email,
      admin
    },
    config()
  );
};

export const remove = async (id) => {
    console.log("Eliminando usuario con id:", id);
    return await axios.delete(`${BASE_URL}/${id}`, config());
};
