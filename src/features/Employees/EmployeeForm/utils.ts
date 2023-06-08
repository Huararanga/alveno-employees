import { InsertEmployee, UpdateEmployee } from "../types";
import { EmployeeFormValues } from "./types";

function hasFullName(input: EmployeeFormValues): input is InsertEmployee {
  return !!input.name && !!input.surname;
}

function removeEmptyKeys(input: EmployeeFormValues) {
  return Object.fromEntries(Object.entries(input).filter(([_, v]) => !!v));
}

export function addEmployeeFormApiAdaptor(
  input: EmployeeFormValues
): InsertEmployee {
  const copy = removeEmptyKeys(input);
  if (hasFullName(copy)) {
    return copy;
  }
  throw new Error("name and surname is required");
}

export function updateEmployeeFormApiAdaptor(
  input: EmployeeFormValues
): UpdateEmployee {
  return removeEmptyKeys(input);
}
