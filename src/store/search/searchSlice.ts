

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchCars } from '../../services/searchService';
import { Car } from '../../models/cars/entity/car'; 

const initialState = {
  cars: [],
  loading: false,
  error: null,
};

export const fetchCarsBySearch = createAsyncThunk(
  'search/fetchCarsBySearch',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await searchCars(searchTerm);
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
  },
});

export default searchSlice.reducer;
