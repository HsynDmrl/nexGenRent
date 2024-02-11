import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export interface BaseState<T> {
  data: T | null;
  allData: T[] | null;
  loading: boolean;
  error?: string | null;
}

const initialState: BaseState<any> = {
  data: null,
  allData: [], 
  loading: false,
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    getDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDataSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
	getAllDataSuccess: (state, action) => {
		state.loading = false;
		state.allData = action.payload;
		//console.log("alldata baseSlice reducers içindeki ", state.allData);
	},
    getDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getDataStart, getDataSuccess, getDataFailure, getAllDataSuccess } = baseSlice.actions;

export const fetchData = <U>(service: any, id: number) => async (dispatch: any) => {
  dispatch(getDataStart());
  try {
    const response: AxiosResponse<U> = await service.getById(id);
    dispatch(getDataSuccess(response.data));
  } catch (error: any) {
    dispatch(getDataFailure(error.message));
  }
};

export const fetchAllData = <T>(service: any) => async (dispatch: any) => {
  dispatch(getDataStart());
  try {
    const response: AxiosResponse<T[]> = await service.getAll();
	//console.log("response burda", response.data);
    dispatch(getAllDataSuccess(response.data));
  } catch (error: any) {
    dispatch(getDataFailure(error.message));
  }
};

export const addData = <T>(service: any, data: T) => async (dispatch: any) => {
  dispatch(getDataStart());
  try {
    const response: AxiosResponse<T> = await service.add(data);
    dispatch(getDataSuccess(response.data));
  } catch (error: any) {
    dispatch(getDataFailure(error.message));
  }
};

export const updateData = <T>(service: any, data: T) => async (dispatch: any) => {
  dispatch(getDataStart());
  try {
    console.log("response.data", data);
    const response: AxiosResponse<T> = await service.update(data);
    dispatch(getDataSuccess(response.data));
  } catch (error: any) {
    console.log("error.message", error.message);
    dispatch(getDataFailure(error.message));
  }
};

export const deleteData = (service: any, id: number) => async (dispatch: any) => {
  dispatch(getDataStart());
  try {
    await service.delete(id);
    dispatch(getDataSuccess(null));
  } catch (error: any) {
    dispatch(getDataFailure(error.message));
  }
};

export default baseSlice.reducer;
