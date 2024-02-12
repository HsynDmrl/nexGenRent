import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/loadingSlice";
import { authReducer } from "./auth/authSlice";
import userReducer from "./user/userSlice";
import baseReducer from "./base/baseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
	base: baseReducer,
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;