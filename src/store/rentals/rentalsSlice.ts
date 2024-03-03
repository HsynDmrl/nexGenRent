import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import rentalService from '../../services/rentalService'; // Yol, projenizdeki yapıya göre değişiklik gösterebilir
import { AddRentalResponse } from '../../models/rentals/response/addRentalResponse';
import { AddRentalRequest } from '../../models/rentals/requests/addRentalRequest';

// Kiralama kaydı ekleme işlemi için async thunk
export const addRentalAsync = createAsyncThunk<AddRentalResponse, AddRentalRequest, {
    rejectValue: string // Hata mesajları için basit bir string tipi kullanıyorum
  }>(
    'rentals/add',
    async (rentalData, { rejectWithValue }) => {
      try {
        const response = await rentalService.add(rentalData);
        return response.data;
      } catch (error) {
        return rejectWithValue("Kiralama işlemi sırasında bir hata oluştu.");
      }
    }
  );

// rentalsSlice initialState
const initialState: {
    rental: AddRentalResponse | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string | null;
  } = {
    rental: null, // Başlangıçta null olarak tanımla
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
  };

// rentalsSlice tanımı

export const rentalsSlice = createSlice({
    name: 'rentals',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(addRentalAsync.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addRentalAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.rental = action.payload;
        })
        .addCase(addRentalAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          if (typeof action.payload === 'string') {
            state.message = action.payload;
          } else {
            state.message = action.error.message ?? 'Bir hata oluştu.';
          }
          state.rental = null;
        });
    },
  });

// Action creators are generated for each case reducer function
export const { reset } = rentalsSlice.actions;

// Reducer
export default rentalsSlice.reducer;
