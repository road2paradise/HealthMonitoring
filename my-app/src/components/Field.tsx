import * as React from "react";
import { IErrors, IFormContext, FormContext, IValues } from "./Form";
/* The available editors for the field */
type Editor = "textbox" | "password" | "multi-line";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args: any) => string;
  args?: any;
}

export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: string[];

  /* The field value */
  value?: any;

  /* The field validator function and argument */
  validation?: IValidation;
}

const Field = (props: IFieldProps) => {
  const { id, label, editor, value } = props;
  /**
   * Gets the validation error for the field
   * @param {IErrors} errors - All the errors from the form
   * @returns {string[]} - The validation error
   */
  const getError = (errors: IErrors): string => (errors ? errors[id] : "");

  /**
   * Gets the inline styles for editor
   * @param {IErrors} errors - All the errors from the form
   * @returns {any} - The style object
   */
  const getEditorStyle = (errors: IErrors): any =>
    getError(errors) ? { borderColor: "red" } : {};
  return (
    <FormContext.Consumer>
      {(appContext: IFormContext) => (
        <div className="form-group">
          {props.label && <label htmlFor={id}>{label}</label>}
          {editor!.toLowerCase() === "textbox" && (
            <input
              id={id}
              type="text"
              value={value}
              style={getEditorStyle(appContext.errors)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                appContext.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                appContext.validate(id)
              }
              className="form-control"
            />
          )}
          {editor!.toLowerCase() === "password" && (
            <input
              id={id}
              type="password"
              value={value}
              style={getEditorStyle(appContext.errors)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                appContext.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={(e: React.FormEvent<HTMLInputElement>) =>
                appContext.validate(id)
              }
              className="form-control"
            />
          )}
          {editor!.toLowerCase() === "multi-line" && (
            <textarea
              id={id}
              value={value}
              style={getEditorStyle(appContext.errors)}
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                appContext.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={(e: React.FormEvent<HTMLTextAreaElement>) =>
                appContext.validate(id)
              }
              className="form-control"
            />
          )}

          {getError(appContext.errors) && (
            <div style={{ color: "red", fontSize: "80%" }}>
              <p>{getError(appContext.errors)}</p>
            </div>
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};
Field.defaultProps = {
  editor: "textbox",
};

export default Field;
