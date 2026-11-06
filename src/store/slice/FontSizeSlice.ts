import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FontSizeLevel = "small" | "medium" | "large";

interface FontSizeState {
  level: FontSizeLevel;
}

const initialState: FontSizeState = {
  level: "medium",
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<FontSizeLevel>) => {
      state.level = action.payload;
    },
  },
});

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
