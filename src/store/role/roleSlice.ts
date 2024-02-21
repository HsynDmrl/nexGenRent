import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import roleService from '../../services/roleService';
import { Role } from '../../models/roles/entity/role';
import { GetAllRoleResponse } from '../../models/roles/response/getAllRoleResponse';
import { AddRoleRequest } from '../../models/roles/requests/addRoleRequest';
import { UpdateRoleRequest } from '../../models/roles/requests/updateRoleRequest';

interface RoleState {
    dataFromById: Role | null;
    allData: Role[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}
const initialState: RoleState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
	selectedId: null,
};

export const getById = createAsyncThunk(
	'role/getById',
	async (Id: number, { rejectWithValue }) => {
	  try {
		const response = await roleService.getById(Id);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const getAll = createAsyncThunk(
	'role/getAll',
	async (_, { rejectWithValue }) => {
	  try {
		const response = await roleService.getAll();
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  
  export const updateRole = createAsyncThunk(
	'role/updateRole',
	async (roleData: UpdateRoleRequest, { rejectWithValue }) => {
	  try {
		const response = await roleService.update(roleData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );
  
  export const addRole = createAsyncThunk(
	'role/addRole',
	async (roleData: AddRoleRequest, { rejectWithValue }) => {
	  try {
		const response = await roleService.add(roleData);
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );

  export const deleteRole = createAsyncThunk(
	'role/deleteRole',
	async (Id: number, { rejectWithValue }) => {
		try {
			const response = await roleService.delete(Id);
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

  const roleSlice = createSlice({
	  name: 'role',
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
				const roles: Role[] = action.payload.map((roleData: GetAllRoleResponse) => ({
					id: roleData.id,
					name: roleData.name,
					createdDate: roleData.createdDate,
					updatedDate: roleData.updatedDate,
				}));
				state.allData = roles;
			} else {
				
			}
		})
		.addCase(updateRole.fulfilled, (state, action) => {
		  state.loading = false;
		})
		.addCase(addRole.fulfilled, (state, action) => {
		  state.loading = false;});
	},
  });

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId, clearSelectedId } = roleSlice.actions;
export default roleSlice.reducer;
