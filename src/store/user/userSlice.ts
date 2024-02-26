import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import { User } from '../../models/users/entity/user';
import { GetAllUserResponse } from '../../models/users/response/getAllUserResponse';
import { AddUserRequest } from '../../models/users/requests/addUserRequest';
import { GetByIdUserResponse } from '../../models/users/response/getByIdUserResponse';
import { UpdateUserRequest } from '../../models/users/requests/updateUserRequest';
import tokenService from '../../services/tokenService';

interface UserState {
    dataFromById: User | null;
    dataFromByEmail: User | null;
    allData: User[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: UserState = {
    dataFromById: null,
    dataFromByEmail: null,
    allData: [],
    loading: false,
    error: null,
    selectedId: null,
};

export const getByEmail = createAsyncThunk(
	'user/fetchUser',
	async (_, { rejectWithValue, dispatch }) => {
	  try {
		const email = tokenService.getEmail();
		const response = await userService.getByEmail(email);
		dispatch(getDataFromByIdSuccess(response.data));
		return response.data;
	  } catch (error:any) {
		return rejectWithValue(error.message);
	  }
	}
  );

export const getById = createAsyncThunk(
    'user/getById',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await userService.getById(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAll = createAsyncThunk(
    'user/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData: UpdateUserRequest, { rejectWithValue }) => {
        try {
            const updateUserRequest: UpdateUserRequest = {
                id: userData.id,
				email: userData.email,
				gsm: userData.gsm,
				name: userData.name,
				nationalityId: userData.nationalityId,
				surname: userData.surname,
            };
            const response = await userService.update(updateUserRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData: AddUserRequest, { rejectWithValue }) => {
        try {
            const response = await userService.add(userData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await userService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const userSlice = createSlice({
    name: 'user',
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
		getDataFromByEmailSuccess: (state, action) => {
			state.loading = false;
			state.dataFromByEmail = action.payload;
		},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.loading = false;
                const getByIdResponse: GetByIdUserResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
					email: getByIdResponse.email,
					gsm: getByIdResponse.gsm,
					name: getByIdResponse.name,
					nationalityId: getByIdResponse.nationalityId,
					password: getByIdResponse.password,
					surname: getByIdResponse.surname,
					role: getByIdResponse.role,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
                };
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const users: User[] = action.payload.map((userData: GetAllUserResponse) => ({
                        id: userData.id,
						email: userData.email,
						gsm: userData.gsm,
						name: userData.name,
						nationalityId: userData.nationalityId,
						password: userData.password,
						surname: userData.surname,
						role: userData.role,
						createdDate: userData.createdDate,
						updatedDate: userData.updatedDate,
                    }));
                    state.allData = users;
                } else {
					state.allData = [];
				}
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFromByEmailSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = userSlice.actions;
export default userSlice.reducer;
