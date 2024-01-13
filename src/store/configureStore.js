import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';

const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});

export default store;