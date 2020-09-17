import * as React from "react";
import { Form, IFields, required, isEmail } from "./Form";
import Field from "./Field";

interface RegisterFormProps {
  handleUserInput?: (user: string) => void;
}
function RegisterForm(Props: RegisterFormProps) {
  const fields: IFields = {
    username: {
      id: "username",
      label: "Username",
      validation: { rule: required },
    },
    email: {
      id: "email",
      label: "Email",
      validation: { rule: isEmail },
    },
    password: {
      id: "password",
      label: "Password",
      editor: "password",
      validation: { rule: required },
    },
  };
  return (
    <>
      <Form
        handleUserInput={Props.handleUserInput}
        fields={fields}
        register={true}
        appointment={false}
        edit={false}
        render={() => (
          <>
            <Field {...fields.username} />
            <Field {...fields.email} />
            <Field {...fields.password} />
          </>
        )}
      />
    </>
  );
}

export default RegisterForm;
