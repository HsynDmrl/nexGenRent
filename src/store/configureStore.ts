import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/loadingSlice";
import { authReducer } from "./auth/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
