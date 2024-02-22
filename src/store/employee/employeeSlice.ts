import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeeService from '../../services/employeeService';
import { Employee } from '../../models/employees/entity/employee';
import { GetAllEmployeeResponse } from '../../models/employees/response/getAllEmployeeResponse';
import { AddEmployeeRequest } from '../../models/employees/requests/addEmployeeRequest';
import { GetByIdEmployeeResponse } from '../../models/employees/response/getByIdEmployeeResponse';
import { UpdateEmployeeRequest } from '../../models/employees/requests/updateEmployeeRequest';

interface EmployeeState {
    dataFromById: Employee | null;
    allData: Employee[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: EmployeeState = {
    dataFromById: null,
    allData: [],
    loading: false,
    error: null,
    selectedId: null,
};

export const getById = createAsyncThunk(
    'employee/getById',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await employeeService.getById(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAll = createAsyncThunk(
    'employee/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await employeeService.getAll();
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employeeData: UpdateEmployeeRequest, { rejectWithValue }) => {
        try {
            const updateEmployeeRequest: UpdateEmployeeRequest = {
                id: employeeData.id,
				salary: employeeData.salary,
				userId: employeeData.userId,
            };
            const response = await employeeService.update(updateEmployeeRequest);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (employeeData: AddEmployeeRequest, { rejectWithValue }) => {
        try {
            const response = await employeeService.add(employeeData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (Id: number, { rejectWithValue }) => {
        try {
            const response = await employeeService.delete(Id);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSelectedIdAction = (id: number) => (dispatch: any) => {
    dispatch(setSelectedId(id));
};

const employeeSlice = createSlice({
    name: 'employee',
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
                const getByIdResponse: GetByIdEmployeeResponse = action.payload;
                state.dataFromById = {
                    id: getByIdResponse.id,
					salary: getByIdResponse.salary,
					user: getByIdResponse.user,
					createdDate: getByIdResponse.createdDate,
					updatedDate: getByIdResponse.updatedDate,
                };
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    const employees: Employee[] = action.payload.map((employeeData: GetAllEmployeeResponse) => ({
                        id: employeeData.id,
						salary: employeeData.salary,
						user: employeeData.user,
						createdDate: employeeData.createdDate,
						updatedDate: employeeData.updatedDate,
                    }));
                    state.allData = employees;
                } else {
                    // handle case if payload is not an array
                }
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const { getDataStart, getDataFromByIdSuccess, getDataFailure, getAllDataSuccess, setSelectedId } = employeeSlice.actions;
export default employeeSlice.reducer;
