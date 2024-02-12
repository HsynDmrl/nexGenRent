import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import carService from '../../services/carService';
import { Car } from '../../models/cars/entity/car';
import tokenService from '../../services/tokenService';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import { AddCarRequest } from '../../models/cars/requests/addCarRequest';

interface CarState {
    dataFromById: Car | null;
    allData: Car[];
    loading: boolean;
    error: string | null;
    selectedId: string | null;
}
const initialState: CarState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
	selectedId: null,
};

export const getById = createAsyncThunk(
	'car/getById',
	async (Id: number, { rejectWithValue }) => {
	  try {
		const response = await carService.getById(Id);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const getAll = createAsyncThunk(
	'car/getAll',
	async (_, { rejectWithValue }) => {
	  try {
		const response = await carService.getAll();
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const updateCar = createAsyncThunk(
	'car/updateCar',
	async (carData: Car, { rejectWithValue }) => {
	  try {
		const response = await carService.update(carData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const addCar = createAsyncThunk(
	'car/addCar',
	async (carData: AddCarRequest, { rejectWithValue }) => {
	  try {
		const response = await carService.add(carData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );

  export const deleteCar = createAsyncThunk(
	'car/addCar',
	async (Id: number, { rejectWithValue }) => {
	  try {
		const response = await carService.delete(Id);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};
  const carSlice = createSlice({
	  name: 'car',
	  initialState,
	  reducers: {
		getDataStart: (state) => {
			state.loading = true;
		},
		getDataFromByIdSuccess: (state, action) => {
			state.loading = false;
			state.dataFromById = action.payload;
		},
		getDataFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getAllDataSuccess: (state, action) => {
			  state.loading = false;
			  state.allData = action.payload;
		  },
		setSelectedId: (state, action) => { 
		  state.selectedId = action.payload;
		},
	},
	extraReducers: (builder) => {
	  builder
		.addCase(getById.fulfilled, (state, action) => {
		  state.loading = false;
		  state.dataFromById = action.payload;
		})
		.addCase(getAll.fulfilled, (state, action) => {
			state.loading = false;
			if (Array.isArray(action.payload)) {
				const cars: Car[] = action.payload.map((carData: GetAllCarResponse) => ({
					id: carData.id,
					kilometer: carData.kilometer,
					year: carData.year,
					dailyPrice: carData.dailyPrice,
					plate: carData.plate,
					imagePath: carData.imagePath,
					gearType: carData.gearType,
					fuelType: carData.fuelType,
					model: carData.model,
					color: carData.color,
					//rentals: carData.rentals,
					logoPath: carData.logoPath,
				}));
				state.allData = cars;
			} else {
				
			}
		})
		.addCase(updateCar.fulfilled, (state, action) => {
		  state.loading = false;
		})
		.addCase(addCar.fulfilled, (state, action) => {
		  state.loading = false;});
	},
  });

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = carSlice.actions;
export default carSlice.reducer;