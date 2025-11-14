import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { alertsReducer } from "@/features/alerts/store/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { STORAGE_KEY } from "@/features/alerts/store/alertsSlice";

const persistAlertsMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  const state = storeApi.getState() as { alerts?: { items: unknown[] } };
  if (state.alerts && typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.alerts.items));
    } catch {
      // ignorar se der erro por enquanto
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistAlertsMiddleware),
});

// Aux Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks typed
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;