import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customerService from '../../services/customerService';
import { Customer } from '../../models/customers/entity/customer';
import { GetAllCustomerResponse } from '../../models/customers/response/getAllCustomerResponse';
import { AddCustomerRequest } from '../../models/customers/requests/addCustomerRequest';
import { GetByIdCustomerResponse } from '../../models/customers/response/getByIdCustomerResponse';
import { UpdateCustomerRequest } from '../../models/customers/requests/updateCustomerRequest';

interface CustomerState {
    dataFromById: Customer | null;
    allData: Customer[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: CustomerState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
    selectedId: null,
};

export const getById = createAsyncThunk(
    'customer/getById',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await customerService.getById(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAll = createAsyncThunk(
    'customer/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customerService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customerData: UpdateCustomerRequest, { rejectWithValue }) => {
        try {
            const updateCustomerRequest: UpdateCustomerRequest = {
                id: customerData.id,
				userId: customerData.userId,
            };
            const response = await customerService.update(updateCustomerRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (customerData: AddCustomerRequest, { rejectWithValue }) => {
        try {
            const response = await customerService.add(customerData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await customerService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const customerSlice = createSlice({
    name: 'customer',
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
                const getByIdResponse: GetByIdCustomerResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
					user: getByIdResponse.user,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
                };
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const customers: Customer[] = action.payload.map((customerData: GetAllCustomerResponse) => ({
                        id: customerData.id,
						user: customerData.user,
						createdDate: customerData.createdDate,
						updatedDate: customerData.updatedDate,
                    }));
                    state.allData = customers;
                } else {
					state.allData = [];
                }
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = customerSlice.actions;
export default customerSlice.reducer;
