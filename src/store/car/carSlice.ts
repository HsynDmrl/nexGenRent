import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import carService from '../../services/carService';
import { Car } from '../../models/cars/entity/car';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import { AddCarRequest } from '../../models/cars/requests/addCarRequest';
import { GetByIdCarResponse } from '../../models/cars/response/getByIdCarResponse';
import { UpdateCarRequest } from '../../models/cars/requests/updateCarRequest';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';

interface CarState {
    dataFromById: Car | null;
    allData: Car[];
    allDataCar:GetAllCarFilterResponse[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: CarState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
    selectedId: null,
    allDataCar: []
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
    async (carData: UpdateCarRequest, { rejectWithValue }) => {
        try {
            const updateCarRequest: UpdateCarRequest = {
                id: carData.id,
				kilometer: carData.kilometer,
				year: carData.year,
				dailyPrice: carData.dailyPrice,
				plate: carData.plate,
				isStatus: carData.isStatus,
				gearType: carData.gearType,
				fuelType: carData.fuelType,
				modelId: carData.modelId,
				colorId: carData.colorId,
            };
            const response = await carService.update(updateCarRequest);
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
            const formData = new FormData();
            Object.entries(carData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await carService.customAdd(formData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCar = createAsyncThunk(
    'car/deleteCar',
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
        setFilteredCars: (state, action) => {
            state.allDataCar = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.loading = false;
                const getByIdResponse: GetByIdCarResponse = action.payload;
                state.dataFromById = {
					id: getByIdResponse.id,
					kilometer: getByIdResponse.kilometer,
					year: getByIdResponse.year,
					dailyPrice: getByIdResponse.dailyPrice,
					plate: getByIdResponse.plate,
					imagePath: getByIdResponse.imagePath,
					status: getByIdResponse.status,
					gearType: getByIdResponse.gearType,
					fuelType: getByIdResponse.fuelType,
					model: getByIdResponse.model,
					color: getByIdResponse.color,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
                };
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
						status: carData.status,
						gearType: carData.gearType,
						fuelType: carData.fuelType,
						model: carData.model,
						color: carData.color,
						createdDate: carData.createdDate,
						updatedDate: carData.updatedDate,
                    }));
                    state.allData = cars;
                    state.allDataCar = action.payload;
                } else {
					state.allData = [];
				}
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const {setFilteredCars, getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = carSlice.actions;
export default carSlice.reducer;
