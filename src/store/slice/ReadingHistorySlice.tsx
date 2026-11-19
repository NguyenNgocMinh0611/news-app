import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ReadingHistoryItem {
  id: string; 
  title: string;
  link: string;
  description?: string;
  image?: string;
  category?: string;
  pubDate?: string;
  readAt: string; 
  readCount: number; 
}

interface ReadingHistoryState {
  history: ReadingHistoryItem[];
  maxItems: number;  
}

const STORAGE_KEY = "news_app_reading_history";
const DEFAULT_MAX_ITEMS = 50;  

 
function loadHistoryFromStorage(): ReadingHistoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("lỗi load localStorage:", error);
  }
  return [];
}

function saveHistoryToStorage(history: ReadingHistoryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed  :", error);
  }
}

const initialState: ReadingHistoryState = {
  history: loadHistoryFromStorage(),
  maxItems: DEFAULT_MAX_ITEMS,
};

export const readingHistorySlice = createSlice({
  name: "readingHistory",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Omit<ReadingHistoryItem, "readAt" | "readCount">>) => {
      const existingIndex = state.history.findIndex((item) => item.id === action.payload.id);
      
      if (existingIndex !== -1) {
        const existingItem = state.history[existingIndex];
        state.history.splice(existingIndex, 1); 
        state.history.unshift({
          ...existingItem,
          ...action.payload,  
          readAt: new Date().toISOString(),
          readCount: existingItem.readCount + 1,
        });
      } else {
        state.history.unshift({
          ...action.payload,
          readAt: new Date().toISOString(),
          readCount: 1,
        });
      }

      if (state.history.length > state.maxItems) {
        state.history = state.history.slice(0, state.maxItems);
      }

      saveHistoryToStorage(state.history);
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((item) => item.id !== action.payload);
      saveHistoryToStorage(state.history);
    },
    clearHistory: (state) => {
      state.history = [];
      saveHistoryToStorage([]);
    },
    setMaxItems: (state, action: PayloadAction<number>) => {
      state.maxItems = action.payload;
      if (state.history.length > action.payload) {
        state.history = state.history.slice(0, action.payload);
        saveHistoryToStorage(state.history);
      }
    },
  },
});

export const { addToHistory, removeFromHistory, clearHistory, setMaxItems } = readingHistorySlice.actions;
export default readingHistorySlice.reducer;
