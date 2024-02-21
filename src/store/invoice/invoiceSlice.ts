import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import invoiceService from '../../services/invoiceService';
import { Invoice } from '../../models/invoices/entity/invoice';
import { GetAllInvoiceResponse } from '../../models/invoices/response/getAllInvoiceResponse';
import { AddInvoiceRequest } from '../../models/invoices/requests/addInvoiceRequest';
import { GetByIdInvoiceResponse } from '../../models/invoices/response/getByIdInvoiceResponse';
import { UpdateInvoiceRequest } from '../../models/invoices/requests/updateInvoiceRequest';

interface InvoiceState {
    dataFromById: Invoice | null;
    allData: Invoice[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: InvoiceState = {
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
            const response = await invoiceService.getById(Id);
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
            const response = await invoiceService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateInvoice = createAsyncThunk(
    'model/updateInvoice',
    async (modelData: UpdateInvoiceRequest, { rejectWithValue }) => {
        try {
            const updateInvoiceRequest: UpdateInvoiceRequest = {
                id: modelData.id,
				invoiceNo: modelData.invoiceNo,
				totalPrice: modelData.totalPrice,
				discountRate: modelData.discountRate,
				taxRate: modelData.taxRate,
				rentalId: modelData.rentalId,
            };
            const response = await invoiceService.update(updateInvoiceRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addInvoice = createAsyncThunk(
    'model/addInvoice',
    async (modelData: AddInvoiceRequest, { rejectWithValue }) => {
        try {
            const response = await invoiceService.add(modelData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteInvoice = createAsyncThunk(
    'model/deleteInvoice',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await invoiceService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const invoiceSlice = createSlice({
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
                const getByIdResponse: GetByIdInvoiceResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
					invoiceNo: getByIdResponse.invoiceNo,
					totalPrice: getByIdResponse.totalPrice,
					discountRate: getByIdResponse.discountRate,
					taxRate: getByIdResponse.taxRate,
					rental: getByIdResponse.rental,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
                };
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const invoices: Invoice[] = action.payload.map((invoiceData: GetAllInvoiceResponse) => ({
                        id: invoiceData.id,
						invoiceNo: invoiceData.invoiceNo,
						totalPrice: invoiceData.totalPrice,
						discountRate: invoiceData.discountRate,
						taxRate: invoiceData.taxRate,
						rental: invoiceData.rental,
						createdDate: invoiceData.createdDate,
						updatedDate: invoiceData.updatedDate,
                    }));
                    state.allData = invoices;
                } else {
					state.allData = [];
                }
            })
            .addCase(updateInvoice.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addInvoice.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = invoiceSlice.actions;
export default invoiceSlice.reducer;
