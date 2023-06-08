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
  async (input: InsertEmployee, payloadCreator) => {
    return await addEmployeeAPI(input);
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
        state.data = action.payload;
        console.log(action)
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = "failed";
      })
      // addEmployee
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state) => {
        // addEmployee request does not return `id`, `createdAt`, so we cannot create new row directly here
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
        const change = payload.meta.arg;
        const changeId = change.id;
        state.data = state.data.map((row) => {
          return row.id === changeId ? { ...row, ...change} : row
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
