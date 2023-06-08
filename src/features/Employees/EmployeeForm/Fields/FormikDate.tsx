import React from "react";
import { FormikContextType } from "formik";
import { EmployeeFormValues } from "../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

// EmployeeFormValues makes component concrete for single form,
// probably we can use generics to abstract this and make the component generic
// it's not as easy as it sounds, since valueName is indexing the formik type

export type FormikDateProps = {
  label: string;
  valueName: keyof EmployeeFormValues;
  formik: FormikContextType<EmployeeFormValues>;
};

export default function FormikDate({ label, valueName, formik }: FormikDateProps) {
  const helpers = formik.getFieldHelpers(valueName);
  const value = formik.values[valueName];
  return (
    <DatePicker
      label={label}
      // datepicker accepts null as initial value and moment objects as date values
      value={value === null ? value : moment(formik.values[valueName])}
      slotProps={{
        actionBar: {
          actions: ['clear']
        }
      }}
      onChange={(val, validation) => {
        // partially filled value is invalid and not written to formik
        // fully filled valid value is writen to formik
        if(!validation.validationError) {
          helpers.setValue(val?.format("YYYY-MM-DD"))
        }
        // initial or cleared value to null is valid and is written to formik
        if(val === null) {
          helpers.setValue(null);
        }
      }}
    />
  );
}
