import * as React from "react";
import { Form, IFields, required } from "./Form";
import Field from "./Field";

interface AppointmentFormProps {
  handleUserInput?: (user: string) => void;
  userName: string;
}
function AppointmentForm(Props: AppointmentFormProps) {
  const fields: IFields = {
    appointmentDesc: {
      id: "appointmentDesc",
      label: "Appointment Notes",
      editor: "multi-line",
      validation: { rule: required },
    },
    appointmentType: {
      id: "appointmentType",
      label: "Appointment Type",
      validation: { rule: required },
    },
    appointmentText: {
      id: "appointmentText",
      label: "Apppointment Title",
      validation: { rule: required },
    },
    doctorsName: {
      id: "doctorsName",
      label: "Doctors Name",
      validation: { rule: required },
    },
  };
  return (
    <>
      <Form
        handleUserInput={Props.handleUserInput}
        userName={Props.userName}
        fields={fields}
        register={false}
        appointment={true}
        edit={false}
        render={() => (
          <>
            <Field {...fields.appointmentText} />
            <Field {...fields.doctorsName} />
            <Field {...fields.appointmentDesc} />
            <Field {...fields.appointmentType} />
          </>
        )}
      />
    </>
  );
}

export default AppointmentForm;
