import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import colorService from '../../services/colorService';
import { Color } from '../../models/colors/entity/color';
import { GetAllColorResponse } from '../../models/colors/response/getAllColorResponse';
import { AddColorRequest } from '../../models/colors/requests/addColorRequest';
import { UpdateColorRequest } from '../../models/colors/requests/updateColorRequest';

interface ColorState {
    dataFromById: Color | null;
    allData: Color[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}
const initialState: ColorState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
	selectedId: null,
};

export const getById = createAsyncThunk(
	'color/getById',
	async (Id: number, { rejectWithValue }) => {
	  try {
		const response = await colorService.getById(Id);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const getAll = createAsyncThunk(
	'color/getAll',
	async (_, { rejectWithValue }) => {
	  try {
		const response = await colorService.getAll();
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  
  export const updateColor = createAsyncThunk(
	'color/updateColor',
	async (colorData: UpdateColorRequest, { rejectWithValue }) => {
	  try {
		const response = await colorService.update(colorData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const addColor = createAsyncThunk(
	'color/addColor',
	async (colorData: AddColorRequest, { rejectWithValue }) => {
	  try {
		const response = await colorService.add(colorData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );

  export const deleteColor = createAsyncThunk(
	'color/deleteColor',
	async (Id: number, { rejectWithValue }) => {
		try {
			const response = await colorService.delete(Id);
			return response.data;
		} catch (error:any) {
			return rejectWithValue(error.message);
		}
	}
);

  
  export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};
export const clearSelectedIdAction = () => (dispatch: any) => {
    dispatch(clearSelectedId());
};

  const colorSlice = createSlice({
	  name: 'color',
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
		clearSelectedId: (state) => {
			state.selectedId = null;
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
				const colors: Color[] = action.payload.map((colorData: GetAllColorResponse) => ({
					id: colorData.id,
					name: colorData.name,
					createdDate: colorData.createdDate,
					updatedDate: colorData.updatedDate,
				}));
				state.allData = colors;
			} else {
				
			}
		})
		.addCase(updateColor.fulfilled, (state, action) => {
		  state.loading = false;
		})
		.addCase(addColor.fulfilled, (state, action) => {
		  state.loading = false;});
	},
  });

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId, clearSelectedId } = colorSlice.actions;
export default colorSlice.reducer;
