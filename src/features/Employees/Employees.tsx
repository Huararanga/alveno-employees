import React, { useEffect, useCallback } from "react";
import { Button, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getEmployees,
  addEmployee,
  selectEmployeesWithTeam,
} from "./employeesSlice";
import { getTeams } from "../Teams/teamsSlice";
import EmployeesTable from "./EmployeesTable";
import AddEmployeeForm from "./EmployeeForm/AddEmployeeForm";
import { EmployeeFormValues } from "./EmployeeForm/types";
import { addEmployeeFormApiAdaptor } from "./EmployeeForm/utils";

export default function Employees() {
  const employees = useAppSelector(selectEmployeesWithTeam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeams()).then(() => {
      dispatch(getEmployees());
    });
  }, [dispatch]);

  const handleAddEmployee = useCallback((values: EmployeeFormValues) => {
    return dispatch(addEmployee(addEmployeeFormApiAdaptor(values))).then(() =>
      // addEmployee request does not return `id`, `createdAt`, so we cannot add row just on frontend
      // we need to refresh whole list to add newly created item to frondend state
      // maybe is better to put refresh to addEmployee thunk
      dispatch(getEmployees())
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction="column" spacing="1rem">
      <Stack direction="row" spacing="1rem" alignItems="center">
        <PersonIcon />
        <Typography fontSize={20}>Employee</Typography>
      </Stack>
      <Stack direction="row" spacing="1rem" alignItems="center">
        <AddEmployeeForm processFormOutput={handleAddEmployee} />
        <Button variant="outlined" onClick={() => dispatch(getEmployees())}>
          Refresh
        </Button>
      </Stack>
      <EmployeesTable rows={employees} />
    </Stack>
  );
}
