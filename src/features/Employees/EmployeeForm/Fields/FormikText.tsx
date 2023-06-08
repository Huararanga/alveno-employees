import React from "react";
import { FormikContextType } from "formik";
import { EmployeeFormValues } from "../types";
import { TextField } from "@mui/material";

// EmployeeFormValues makes component concrete for single form,
// probably we can use generics to abstract this and make the component generic
// it's not as easy as it sounds, since valueName is indexing the formik type

export type FormikTextProps = {
  label: string;
  valueName: keyof EmployeeFormValues;
  formik: FormikContextType<EmployeeFormValues>;
};

export default function Text({ label, valueName, formik }: FormikTextProps) {
  return (
    <TextField
      variant="standard"
      label={label}
      {...formik.getFieldProps(valueName)}
      placeholder={valueName}
      error={!!formik.errors[valueName]}
      helperText={formik.errors[valueName]}
      fullWidth
    />
  );
}
