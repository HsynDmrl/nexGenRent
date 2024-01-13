import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CarService from '../../services/CarService';
import ModelService from '../../services/ModelService';
import ColorService from '../../services/ColorService';

const initialState = {
  cars: [],
  selectedCar: null,
  models: [],
  colors: [],
  newCarData: {
    plate: '',
    modelId: '',
    colorId: '',
    kilometer: 0,
    year: 2022,
    dailyPrice: 0,
  },
  updateCarData: {
    plate: '',
    modelId: '',
    colorId: '',
    kilometer: 0,
    year: 2022,
    dailyPrice: 0,
  },
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const carService = new CarService();
    const response = await carService.getAll();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchModelsAndColors = createAsyncThunk('cars/fetchModelsAndColors', async () => {
  try {
    const modelService = new ModelService();
    const colorService = new ColorService();

    const modelResponse = await modelService.getAll();
    const colorResponse = await colorService.getAll();

    return {
      models: modelResponse.data,
      colors: colorResponse.data,
    };
  } catch (error) {
    throw error;
  }
});

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    selectCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    updateNewCarData: (state, action) => {
      state.newCarData = action.payload;
    },
    updateUpdateCarData: (state, action) => {
      state.updateCarData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
      })
      .addCase(fetchModelsAndColors.fulfilled, (state, action) => {
        state.models = action.payload.models;
        state.colors = action.payload.colors;
      });
  },
});

export const { selectCar, updateNewCarData, updateUpdateCarData } = carSlice.actions;
export default carSlice.reducer;
