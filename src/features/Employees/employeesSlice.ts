import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getEmployeesAPI } from './employeesAPI';
import { Employee } from './supabase';

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
    const response = await getEmployeesAPI();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action)
        state.data = action.payload;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { increment, decrement, incrementByAmount } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.data;

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default employeesSlice.reducer;
