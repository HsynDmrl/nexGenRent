import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, fetchAllData, addData, updateData, deleteData } from '../base/baseSlice';
import userService from '../../services/userService';
import { User } from '../../models/users/entity/user';
import { BaseState } from '../base/baseSlice';
import tokenService from '../../services/tokenService';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';

const initialState: BaseState<User> = {
    data: null,
    allData: [],
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const email = tokenService.getEmail();
      const response = await userService.getByEmail(email);
      dispatch(getDataSuccess(response.data));
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      getDataStart: (state) => {
          state.loading = true;
      },
      getDataSuccess: (state, action) => {
          state.loading = false;
          state.data = action.payload;
      },
      getDataFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
      },
      getAllDataSuccess: (state, action) => {
		state.loading = false;
		state.allData = action.payload;
	},
  },  
});

export const { getDataStart, getDataSuccess, getDataFailure, getAllDataSuccess } = userSlice.actions;
export const getUser = (id: number) => fetchData<GetAllCarResponse>(userService, id);
export const getAllUsers = () => fetchAllData<User>(userService);
export const addUser = (data: User) => addData<User>(userService, data);
export const updateUser = (data: User) => updateData<User>(userService, data);
export const deleteUser = (id: number) => deleteData(userService, id);

export default userSlice.reducer;


// export const getAllUsers = () => async (dispatch: any) => {
//   try {
//     dispatch(getDataStart());
//     const response = await userService.getAll();
//     dispatch(getAllDataSuccess(response.data));
//   } catch (error: any) {
//     dispatch(getDataFailure(error.message));
// 	console.log("error", error.message);
//   }
// };