import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { Alert } from "../types/alert";

interface AlertsState {
  items: Alert[];
};

const STORAGE_KEY = "alerts";

function loadInitialAlerts(): Alert[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Alert[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

const initialState: AlertsState = {
  items: loadInitialAlerts(),
};

interface CreateAlertPayload {
  title: string;
  description: string;
  severity: Alert["severity"];
};

const alertsSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<CreateAlertPayload>) => {
      const now = new Date().toISOString();
      state.items.push({
        id: nanoid(),
        createdAt: now,
        ...action.payload,
      });
    },
    deleteAlert: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((alert) => alert.id !== action.payload);
    },
    //Update alert etc later
  },
});

export const { createAlert, deleteAlert } = alertsSlice.actions;
export const alertsReducer = alertsSlice.reducer;
export { STORAGE_KEY };