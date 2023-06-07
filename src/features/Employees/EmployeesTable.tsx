import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EmployeeWithTeam } from "./types";
import moment from "moment";

export type EmployeesTableProps = {
  rows: EmployeeWithTeam[];
};

export default function EmployeesTable({ rows }: EmployeesTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '70vh',
        width: 'auto',
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell width="15%">Start date</TableCell>
            <TableCell width="15%">End date</TableCell>
            <TableCell width="15%">Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isNoMoreWorking = row.endDate
              ? moment(row.endDate).isBefore()
              : false;
            return (
              <TableRow
                key={row.id}
                sx={(theme) => {
                  return {
                    backgroundColor: isNoMoreWorking
                      ? theme.palette.grey[100]
                      : undefined,
                    textDecoration: isNoMoreWorking
                    ? 'line-through'
                    : undefined,
                  };
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate ? row.endDate : ""}</TableCell>
                <TableCell>{row.teamName ? row.teamName : ""}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
