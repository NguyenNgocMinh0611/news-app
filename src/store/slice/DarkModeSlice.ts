import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
  enabled: boolean;
}

const STORAGE_KEY = "darkMode";

function loadFromStorage(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  } catch {
    return false;
  }
}

function saveToStorage(enabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // ignore
  }
}

const initialState: DarkModeState = {
  enabled: loadFromStorage(),
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.enabled = !state.enabled;
      saveToStorage(state.enabled);
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
      saveToStorage(state.enabled);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
