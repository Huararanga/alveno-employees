import { useState, memo } from "react";
import { Button, ButtonProps } from "@mui/material";
import EmployeeForm, { EmployeeFormProps } from "./EmployeeForm";

export type AddEmployeeFormProps = Pick<EmployeeFormProps, "processFormOutput"> & ButtonProps;

function AddEmployeeForm({ processFormOutput, ...rest }: AddEmployeeFormProps) {
  const [isOpen, openForm] = useState(false);

  return (
    <div>
      <Button {...rest} onClick={() => openForm(true)}>
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
