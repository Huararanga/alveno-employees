import { useState, memo } from "react";
import { Button } from "@mui/material";
import EmployeeForm, { EmployeeFormProps } from "./EmployeeForm";

export type AddEmployeeFormProps = Pick<EmployeeFormProps, "processFormOutput">;

function AddEmployeeForm({ processFormOutput }: AddEmployeeFormProps) {
  const [isOpen, openForm] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => openForm(true)}>
        Add
      </Button>
      <EmployeeForm
        mode="add"
        isOpen={isOpen}
        openForm={openForm}
        processFormOutput={processFormOutput}
      />
    </div>
  );
}

export default memo(AddEmployeeForm);
