import React, { useState, useCallback } from "react";
import moment from "moment";
import { TableCell, IconButton, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { EmployeeWithTeam } from "./types";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import { EmployeeFormValues } from "./EmployeeForm/types";
import { updateEmployee } from "./employeesSlice";
import { useAppDispatch } from "../../app/hooks";
import { updateEmployeeFormApiAdaptor } from "./EmployeeForm/utils";

export type EmployeesRowProps = {
  row: EmployeeWithTeam;
};

export default function EmployeesRow({ row }: EmployeesRowProps) {
  const { id, name, surname, startDate, endDate, team, teamName } = row;

  const dispatch = useAppDispatch();
  const [isFormOpen, setOpenForm] = useState(false);
  // we would like to keep dialog mounted once is visited to remember last form fields state
  const [wasFormOpened, setWasFormOpened] = useState(false);
  const isNoMoreWorking = endDate ? moment(endDate).isBefore() : false;

  const handleUpdateEmployee = useCallback((values: EmployeeFormValues) => {
    return dispatch(updateEmployee(updateEmployeeFormApiAdaptor(values)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableRow
      sx={(theme) => {
        return {
          backgroundColor: isNoMoreWorking
            ? theme.palette.grey[100]
            : undefined,
          textDecoration: isNoMoreWorking ? "line-through" : undefined,
        };
      }}
    >
      <TableCell>
        <IconButton
          onClick={(e) => {
            if (!wasFormOpened) {
              setWasFormOpened(true);
            }
            setOpenForm(true);
          }}
        >
          <EditIcon/>
        </IconButton>
        {wasFormOpened && (
          <EmployeeForm
            mode="update"
            isOpen={isFormOpen}
            openForm={setOpenForm}
            processFormOutput={handleUpdateEmployee}
            id={id}
            name={name}
            surname={surname}
            startDate={startDate}
            endDate={endDate}
            team={team}
          />
        )}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{surname}</TableCell>
      <TableCell>{startDate}</TableCell>
      <TableCell>{endDate ? endDate : ""}</TableCell>
      <TableCell>{teamName ? teamName : ""}</TableCell>
    </TableRow>
  );
}
