import { InsertEmployee, UpdateEmployee } from "../types";

export type EmployeeFormValues = Omit<InsertEmployee, 'createdAt'> | Omit<UpdateEmployee, 'createdAt'>;