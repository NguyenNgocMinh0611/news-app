import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedInEmail: string | null;
}

const initialState: AuthState = {
  loggedInEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedInEmail = action.payload;
    },
    logout: (state) => {
      state.loggedInEmail = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
