import usersApi from "../apis/usersApi";

const BASE_URL = "";

export const findAllUsers = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const save = async ({ username, email, password, admin }) => {
  return await usersApi.post(BASE_URL, {
    username,
    email,
    password,
    admin,
  });
};

export const update = async ({ id, username, email, admin }) => {
  return await usersApi.put(`${BASE_URL}/${id}`, {
    username,
    email,
    admin,
  });
};

export const remove = async (id) => {
  console.log("Eliminando usuario con id:", id);
  return await usersApi.delete(`${BASE_URL}/${id}`);
};
