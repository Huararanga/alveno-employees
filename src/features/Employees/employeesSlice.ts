import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getEmployeesAPI } from './employeesAPI';
import { Employee, EmployeeWithTeam } from './types';

export interface EmployeesState {
  data: Employee[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EmployeesState = {
  data: [],
  status: 'idle',
};

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async () => {
    return await getEmployeesAPI();
  }
);

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectEmployees = (state: RootState) => state.employees.data;
export const selectEmployeesWithTeam = (state: RootState): EmployeeWithTeam[] => {
  const teamsById = state.teams.dataById;
  return state.employees.data.map((employee) => {
    return {
      ...employee,
      teamName: employee.team ? teamsById[employee.team].name : null,
    }   
  })
};

export default employeesSlice.reducer;
