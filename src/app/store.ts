import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeesReducer from '../features/Employees/employeesSlice';
import teamsReducer from '../features/Teams/teamsSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    teams: teamsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
