import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FontSizeLevel = "small" | "medium" | "large";

interface FontSizeState {
  level: FontSizeLevel;
}

const STORAGE_KEY = "fontSize";

const VALID_LEVELS: FontSizeLevel[] = ["small", "medium", "large"];

function loadFromStorage(): FontSizeLevel {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LEVELS.includes(stored as FontSizeLevel)) {
      return stored as FontSizeLevel;
    }
  } catch {
    // ignore
  }
  return "medium";
}

function saveToStorage(level: FontSizeLevel) {
  try {
    localStorage.setItem(STORAGE_KEY, level);
  } catch {
    // ignore
  }
}

const initialState: FontSizeState = {
  level: loadFromStorage(),
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<FontSizeLevel>) => {
      state.level = action.payload;
      saveToStorage(state.level);
    },
  },
});

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
