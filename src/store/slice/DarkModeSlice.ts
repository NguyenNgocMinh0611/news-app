import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
  enabled: boolean;
}

const initialState: DarkModeState = {
  enabled: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.enabled = !state.enabled;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
