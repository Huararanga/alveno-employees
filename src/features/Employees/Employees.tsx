import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getEmployees, selectEmployees } from "./employeesSlice";
import styles from "./Employees.module.css";
import EmployeesTable from "./EmployeesTable";

export function Employees() {
  const employees = useAppSelector(selectEmployees);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  return (
    <div>
      <button
        className={styles.asyncButton}
        onClick={() => dispatch(getEmployees())}
      >
        Refresh
      </button>
      <EmployeesTable rows={employees} />
    </div>
  );
}
