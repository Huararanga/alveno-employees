import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getEmployeesAPI,
  addEmployeeAPI,
  updateEmployeeAPI,
} from "./employeesAPI";
import {
  Employee,
  EmployeeWithTeam,
  InsertEmployee,
  UpdateEmployee,
} from "./types";

export interface EmployeesState {
  data: Employee[];
  status: "idle" | "loading" | "failed";
}

const initialState: EmployeesState = {
  data: [],
  status: "idle",
};

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    return await getEmployeesAPI();
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (input: InsertEmployee, { dispatch }) => {
    await addEmployeeAPI(input);
    // addEmployee request does not return `id`, `createdAt`, so we cannot add row just on frontend
    // we need to refresh whole list to add newly created item to frondend state
    return dispatch(getEmployees());
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (input: UpdateEmployee) => {
    return await updateEmployeeAPI(input);
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getEmployees
      .addCase(getEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = [...action.payload].reverse();
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = "failed";
      })
      // addEmployee
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addEmployee.rejected, (state) => {
        state.status = "failed";
      })
      // updateEmployee
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, payload) => {
        // row is updated on backend, we have everything to safely update state
        const change = payload.meta.arg;
        const changeId = change.id;
        state.data.forEach((row, index) => {
          if (row.id === changeId) {
            state.data[index] = { ...row, ...change };
          }
        });
        state.status = "idle";
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectEmployees = (state: RootState) => state.employees.data;
export const selectEmployeesWithTeam = (
  state: RootState
): EmployeeWithTeam[] => {
  const teamsById = state.teams.dataById;
  return state.employees.data.map((employee) => {
    return {
      ...employee,
      teamName: employee.team ? teamsById[employee.team].name : null,
    };
  });
};

export default employeesSlice.reducer;
