import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        },
      ];
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
      });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload);
    },
    loadingUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, loadingUsers } =
  userSlice.actions;
