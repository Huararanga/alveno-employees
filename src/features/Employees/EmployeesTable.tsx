import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { EmployeeWithTeam } from "./types";
import EmployeesRow from "./EmployeesRow";

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
            <TableCell width="5%"></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell width="15%">Start date</TableCell>
            <TableCell width="15%">End date</TableCell>
            <TableCell width="15%">Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => <EmployeesRow key={row.id} row={row}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
