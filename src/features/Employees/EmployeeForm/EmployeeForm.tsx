import { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Stack,
} from "@mui/material";
import { EmployeeFormValues } from "./types";
import FormikText from "./Fields/FormikText";
import FormikDate from "./Fields/FormikDate";
import FormikTeamSelect from "./Fields/FormikTeamSelect";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  surname: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // date validations are done by MUI:DatePicker
});

export type EmployeeFormProps = {
  mode: "add" | "update";
  processFormOutput: (values: EmployeeFormValues) => Promise<unknown>;
  isOpen: boolean;
  openForm: (open: boolean) => void;

  id?: EmployeeFormValues["id"];
  name?: EmployeeFormValues["name"];
  surname?: EmployeeFormValues["surname"];
  startDate?: EmployeeFormValues["startDate"];
  endDate?: EmployeeFormValues["endDate"];
  team?: EmployeeFormValues["team"];
}

function EmployeeForm({
  mode,
  processFormOutput,
  isOpen,
  openForm,
  id,
  name,
  surname,
  startDate,
  endDate,
  team,
}: EmployeeFormProps) {
  const formik = useFormik({
    initialValues: {
      id, // is never edited
      name: name || "", // controled components requires initialized values and to be passed initially
      surname: surname || "",
      team: team || "",
      startDate: startDate || null, // MUI: Daypicker accepts only null as default value
      endDate: endDate || null,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: EmployeeFormValues, { resetForm }) => {
      try {
        await processFormOutput(values);
        openForm(false);
      } catch (error) {
        resetForm();
      }
    },
  });

  return (
    <div>
      <Dialog open={isOpen} fullWidth maxWidth="md">
        <DialogTitle>{mode === 'add' ? "Add Employee" : "Edit Employee"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing='1rem'>
              <FormikText label="Name" valueName="name" formik={formik} />
              <FormikText label="Surname" valueName="surname" formik={formik} />
              <FormikDate
                label="Start Date"
                valueName="startDate"
                formik={formik}
              />
              <FormikDate
                label="End Date "
                valueName="endDate"
                formik={formik}
              />
              <FormikTeamSelect valueName="team" formik={formik} />
              <DialogActions>
              <Button variant="outlined" onClick={() => openForm(false)}>
                Close
              </Button>
              <Button
                variant="outlined"
                type="submit"
                disabled={!!Object.keys(formik.errors).length}
              >
                Submit
              </Button>
            </DialogActions>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(EmployeeForm);
