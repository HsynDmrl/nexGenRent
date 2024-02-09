import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, fetchAllData, addData, updateData, deleteData } from '../base/baseSlice';
import userService from '../../services/userService';
import { User } from '../../models/users/entity/user';
import { BaseState } from '../base/baseSlice';
import tokenService from '../../services/tokenService';

const initialState: BaseState<User> = {
    data: null,
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
  },  
});

export const { getDataStart, getDataSuccess, getDataFailure } = userSlice.actions;

export const getUser = (id: number) => fetchData<User>(userService, id);
export const getAllUsers = () => fetchAllData<User>(userService);
export const addUser = (data: User) => addData<User>(userService, data);
export const updateUser = (id: number, data: User) => updateData<User>(userService, id, data);
export const deleteUser = (id: number) => deleteData(userService, id);

export default userSlice.reducer;
