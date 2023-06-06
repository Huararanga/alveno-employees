import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Employee } from "./supabase";
import moment from "moment";

export type EmployeesTableProps = {
  rows: Employee[];
};

export default function EmployeesTable({ rows }: EmployeesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Start date</TableCell>
            <TableCell>End date</TableCell>
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
                sx={{
                //   "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: isNoMoreWorking ? 'secondary.main' : undefined,
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate ? row.endDate : ''}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
