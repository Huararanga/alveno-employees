import React from "react";
import { FormikContextType } from "formik";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { selectTeams } from "../../../Teams/teamsSlice";
import { EmployeeFormValues } from "../types";

// EmployeeFormValues makes component concrete for single form,
// probably we can use generics to abstract this and make the component generic
// it's not as easy as it sounds, since valueName is indexing the formik type

export type FormikTextProps = {
  valueName: keyof EmployeeFormValues;
  formik: FormikContextType<EmployeeFormValues>;
};

export default function FormikTeamSelect({ valueName, formik }: FormikTextProps) {
  const teams = useAppSelector(selectTeams);
  return (
    <Select
      {...formik.getFieldProps(valueName)}
      label="Team"
    >
      {teams.map((team) => {
        return <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
      })}
      <MenuItem key='none' value=''>None</MenuItem>
    </Select>
  );
}
