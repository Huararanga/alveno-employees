import React, { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getEmployees, selectEmployeesWithTeam } from "./employeesSlice";
import { getTeams } from "../Teams/teamsSlice";
import EmployeesTable from "./EmployeesTable";

export function Employees() {
  const employees = useAppSelector(selectEmployeesWithTeam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeams()).then(() => {
      dispatch(getEmployees());
    });
  }, [dispatch]);

  return (
    <Stack direction="column" spacing="1rem">
      <Stack direction="row" spacing="1rem" alignItems="center">
        <PersonIcon />
        <Typography fontSize={20}>Employee</Typography>
      </Stack>
      <Stack direction="row" spacing="1rem" alignItems="center">
        <Button variant="outlined" onClick={() => dispatch(getEmployees())}>
          Refresh
        </Button>
        <Button variant="outlined" onClick={() => dispatch(getEmployees())}>
          Add
        </Button>
      </Stack>
      <EmployeesTable rows={employees} />
    </Stack>
  );
}
