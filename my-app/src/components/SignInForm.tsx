import * as React from "react";
import { Form, IFields, required } from "./Form";
import Field from "./Field";

interface SignInFormProps {
  handleUserInput: (user: string) => void;
}

export const SignInForm = (Props: SignInFormProps) => {
  const fields: IFields = {
    username: {
      id: "username",
      label: "Username",
      validation: { rule: required },
    },
    password: {
      id: "password",
      label: "Password",
      editor: "password",
      validation: { rule: required },
    },
  };
  return (
    <Form
      fields={fields}
      register={false}
      appointment={false}
      edit={false}
      handleUserInput={Props.handleUserInput}
      render={() => (
        <>
          <Field {...fields.username} />
          <Field {...fields.password} />
        </>
      )}
    />
  );
};
