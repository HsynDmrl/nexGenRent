import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../auth/authSlice";
import userReducer from "../user/userSlice";
import baseReducer from "../base/baseSlice";
import brandReducer from "../brand/brandSlice";
import modelReducer from "../model/modelSlice";
import adminToggleReducer from "../adminToggle/adminToggleSlice";
import colorReducer from "../color/colorSlice";
import roleReducer from "../role/roleSlice";
import employeeReducer from "../employee/employeeSlice";
import carReducer from "../car/carSlice";
import customerReducer from "../customer/customerSlice";
import rentalReducer from "../rental/rentalSlice";
import rentalsReducer from "../rentals/rentalsSlice";
import invoiceReducer from "../invoice/invoiceSlice";
import { loadingReducer } from "../loading/loadingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
	base: baseReducer,
	car: carReducer,
    user: userReducer,
	brand: brandReducer,
	role: roleReducer,
	rental: rentalReducer,
	invoice: invoiceReducer,
	model: modelReducer,
	color: colorReducer,
	employee: employeeReducer,
	customer: customerReducer,
	toggleAdminSidebar: adminToggleReducer,
	rentals:rentalsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
