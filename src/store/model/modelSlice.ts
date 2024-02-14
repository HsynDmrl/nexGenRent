import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import modelService from '../../services/modelService';
import { Model } from '../../models/models/entity/model';
import { GetAllModelResponse } from '../../models/models/response/getAllModelResponse';
import { AddModelRequest } from '../../models/models/requests/addModelRequest';
import { GetByIdModelResponse } from '../../models/models/response/getByIdModelResponse';
import { UpdateModelRequest } from '../../models/models/requests/updateModelRequest';

interface ModelState {
    dataFromById: Model | null;
    allData: Model[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: ModelState = {
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
            const response = await modelService.getById(Id);
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
            const response = await modelService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateModel = createAsyncThunk(
    'model/updateModel',
    async (modelData: UpdateModelRequest, { rejectWithValue }) => {
        try {
            console.log("modelSlice içindeki ", modelData.brandId);
            const updateModelRequest: UpdateModelRequest = {
                id: modelData.id,
                name: modelData.name,
                brandId: modelData.brandId,
            };
            const response = await modelService.update(updateModelRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addModel = createAsyncThunk(
    'model/addModel',
    async (modelData: AddModelRequest, { rejectWithValue }) => {
        try {
            const response = await modelService.add(modelData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteModel = createAsyncThunk(
    'model/deleteModel',
    async (Id: number, { rejectWithValue }) => {
        try {
			console.log("modelSlice içindeki ", Id);
            const response = await modelService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const modelSlice = createSlice({
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
                const getByIdResponse: GetByIdModelResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
                    name: getByIdResponse.name,
                    brand: getByIdResponse.brand,
                };
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const models: Model[] = action.payload.map((modelData: GetAllModelResponse) => ({
                        id: modelData.id,
                        name: modelData.name,
                        brand: modelData.brand,
                    }));
                    state.allData = models;
                } else {
                    // handle case if payload is not an array
                }
            })
            .addCase(updateModel.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addModel.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteModel.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = modelSlice.actions;
export default modelSlice.reducer;
