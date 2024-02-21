import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import rentalService from '../../services/rentalService';
import { Rental } from '../../models/rentals/entity/rental';
import { GetAllRentalResponse } from '../../models/rentals/response/getAllRentalResponse';
import { AddRentalRequest } from '../../models/rentals/requests/addRentalRequest';
import { GetByIdRentalResponse } from '../../models/rentals/response/getByIdRentalResponse';
import { UpdateRentalRequest } from '../../models/rentals/requests/updateRentalRequest';

interface RentalState {
    dataFromById: Rental | null;
    allData: Rental[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: RentalState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
    selectedId: null,
};

export const getById = createAsyncThunk(
    'model/getById',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await rentalService.getById(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAll = createAsyncThunk(
    'model/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await rentalService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateRental = createAsyncThunk(
    'model/updateRental',
    async (modelData: UpdateRentalRequest, { rejectWithValue }) => {
        try {
            const updateRentalRequest: UpdateRentalRequest = {
				id: modelData.id,
				startDate: modelData.startDate,
				endDate: modelData.endDate,
				returnDate: modelData.returnDate,
				startKilometer: modelData.startKilometer,
				endKilometer: modelData.endKilometer,
				totalPrice: modelData.totalPrice,
				discount: modelData.discount,
				carId: modelData.carId,
				customerId: modelData.customerId,
				employeeId: modelData.employeeId
			};
            const response = await rentalService.update(updateRentalRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addRental = createAsyncThunk(
    'model/addRental',
    async (modelData: AddRentalRequest, { rejectWithValue }) => {
        try {
            const response = await rentalService.add(modelData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteRental = createAsyncThunk(
    'model/deleteRental',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await rentalService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const rentalSlice = createSlice({
    name: 'model',
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
                const getByIdResponse: GetByIdRentalResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
					startDate: getByIdResponse.startDate,
					endDate: getByIdResponse.endDate,
					returnDate: getByIdResponse.returnDate,
					startKilometer: getByIdResponse.startKilometer,
					endKilometer: getByIdResponse.endKilometer,
					totalPrice: getByIdResponse.totalPrice,
					discount: getByIdResponse.discount,
					car: getByIdResponse.car,
					customer: getByIdResponse.customer,
					employee: getByIdResponse.employee,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
				};
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const rentals: Rental[] = action.payload.map((rentalData: GetAllRentalResponse) => ({
                        id: rentalData.id,
						startDate: rentalData.startDate,
						endDate: rentalData.endDate,
						returnDate: rentalData.returnDate,
						startKilometer: rentalData.startKilometer,
						endKilometer: rentalData.endKilometer,
						totalPrice: rentalData.totalPrice,
						discount: rentalData.discount,
						car: rentalData.car,
						customer: rentalData.customer,
						employee: rentalData.employee,
						createdDate: rentalData.createdDate,
						updatedDate: rentalData.updatedDate,
					}));
					state.allData = rentals;
				} else {
					state.allData = [];
				}
            })
            .addCase(updateRental.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addRental.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteRental.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = rentalSlice.actions;
export default rentalSlice.reducer;
