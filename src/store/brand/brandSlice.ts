import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandService from '../../services/brandService';
import { Brand } from '../../models/brands/entity/brand';
import { GetAllBrandResponse } from '../../models/brands/response/getAllBrandResponse';
import { AddBrandRequest } from '../../models/brands/requests/addBrandRequest';

interface BrandState {
    dataFromById: Brand | null;
    allData: Brand[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}
const initialState: BrandState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
	selectedId: null,
};

export const getById = createAsyncThunk(
	'brand/getById',
	async (Id: number, { rejectWithValue }) => {
	  try {
		const response = await brandService.getById(Id);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const getAll = createAsyncThunk(
	'brand/getAll',
	async (_, { rejectWithValue }) => {
	  try {
		const response = await brandService.getAll();
		const brands: GetAllBrandResponse[] = response.data.map((item: any) => ({
		  ...item,
		}));
		console.log('getAll', brands);
		return brands;
	  } catch (error: any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  
  export const updateBrand = createAsyncThunk(
	'brand/updateBrand',
	async (brandData: Brand, { rejectWithValue }) => {
	  try {
		const response = await brandService.update(brandData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const addBrand = createAsyncThunk(
	'brand/addBrand',
	async (brandData: AddBrandRequest, { rejectWithValue }) => {
	  try {
		const response = await brandService.add(brandData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );

  export const deleteBrand = createAsyncThunk(
	'brand/deleteBrand',
	async (Id: number, { rejectWithValue }) => {
		try {
			const response = await brandService.delete(Id);
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

  const brandSlice = createSlice({
	  name: 'brand',
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
			state.selectedId = null; // Clear the selected ID
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
				const brands: Brand[] = action.payload.map((brandData: GetAllBrandResponse) => ({
					id: brandData.id,
					name: brandData.name,
					logoPath: brandData.logoPath,
				}));
				state.allData = brands;
			} else {
				
			}
		})
		.addCase(updateBrand.fulfilled, (state, action) => {
		  state.loading = false;
		})
		.addCase(addBrand.fulfilled, (state, action) => {
		  state.loading = false;});
	},
  });

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId, clearSelectedId } = brandSlice.actions;
export default brandSlice.reducer;