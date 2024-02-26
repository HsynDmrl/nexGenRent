import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CarFilterModel } from '../../models/filter/response/getCarFilter';
import { FilterService } from '../../services/filterService';
import { Car } from '../../models/cars/entity/car';

const filterService = new FilterService();

export const fetchFilteredCars = createAsyncThunk(
    'filters/fetchFilteredCars',
    async (filters: CarFilterModel) => {
      try {
        const response = await filterService.fetchCarsWithFilters(filters);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );
  
  

interface FilterState {
  cars: any[]; // Burada araçların tipini belirtmelisiniz
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  cars: [],
  loading: false,
  error: null
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilterState: (state) => {
      state.cars = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
        state.error = null;
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== null && action.payload !== undefined) {
          state.error = action.payload.toString(); // Nesneyi stringe dönüştürerek ata
        } else {
          state.error = "Bir hata oluştu"; // Varsayılan hata mesajını atayabilirsiniz
        }
      });
      
      
      
  },
});

export const { clearFilterState } = filterSlice.actions;

export default filterSlice.reducer;
