import { InsertEmployee, UpdateEmployee } from "../types";
import { EmployeeFormValues } from "./types";

/**
 * Check if is input InsertEmployee and return its type
 * 
 * Controlled/MUI components often need to initialize values for uninitialized/null attributes.
 * f.e api { field: undefined } => form output { field: '' }
 * here we are reversing this operation. Form output { field: '' } => api { field: undefined }
 * 
 * @param {EmployeeFormValues} input
 * @returns {EmployeeFormValues}
 */

function isInsertEmployee(input: EmployeeFormValues): input is InsertEmployee {
  return !!input.name && !!input.surname;
}

/**
 * Remove empty keys from EmployeeFormValues
 * 
 * Controlled/MUI components often need to initialize values for uninitialized/null attributes.
 * f.e api { field: undefined } => form output { field: '' }
 * here we are reversing this operation. Form output { field: '' } => api { field: undefined }
 * 
 * @param {EmployeeFormValues} input
 * @returns {EmployeeFormValues}
 */
function removeEmptyKeys(input: EmployeeFormValues) {
  return Object.fromEntries(Object.entries(input).filter(([_, v]) => !!v));
}

/**
 * Adapt EmployeeForm output to InsertEmployee api type
 * 
 * @param {EmployeeFormValues} input
 * @returns {InsertEmployee}
 */
export function addEmployeeFormApiAdaptor(
  input: EmployeeFormValues
): InsertEmployee {
  const copy = removeEmptyKeys(input);
  if (isInsertEmployee(copy)) {
    return copy;
  }
  throw new Error("name and surname is required");
}

/**
 * Adapt EmployeeForm output to UpdateEmployee api type
 * 
 * @param {EmployeeFormValues} input
 * @returns {InsertEmployee}
 */
export function updateEmployeeFormApiAdaptor(
  input: EmployeeFormValues
): UpdateEmployee {
  return removeEmptyKeys(input);
}
