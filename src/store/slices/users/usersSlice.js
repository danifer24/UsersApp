import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userSelected: initialUserForm,
    visibleForm: false,
    errors: initialErrors,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        },
      ];
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },
    updateUser: (state, action) => {
      state.users = state.users.map((u) => {
        if (u.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return u;
      });
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id != payload);
    },
    loadingUsers: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },
    onUserSelectedForm: (state, { payload }) => {
      state.userSelected = payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = initialUserForm;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  loadingUsers,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = usersSlice.actions;
