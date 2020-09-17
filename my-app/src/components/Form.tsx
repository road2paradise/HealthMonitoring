import * as React from "react";
import { IFieldProps } from "./Field";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "./CircularProgress";
import "./Form.css";

export interface IFields {
  [key: string]: IFieldProps;
}
interface IFormProps {
  /* The props for all the fields on the form */
  fields: IFields;
  register: boolean;
  appointment: boolean;
  handleUserInput?: (user: string) => void;
  userName?: string;
  edit?: boolean;
  id?: number;

  /* A prop which allows content to be injected */
  render: () => React.ReactNode;
}
export interface IFormContext extends IFormState {
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues) => void;
  /* Function that validates a field */
  validate: (fieldName: string) => void;
}
/*
 * The context which allows state and functions to be shared with Field.
 * Note that we need to pass createContext a default value which is why undefined is unioned in the type
 */

export interface IValues {
  /* Key value pairs for all the field values with key being the field name */
  [key: string]: any;
}

export interface IErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}

export interface IFormState {
  /* The field values */
  values: IValues;

  /* The field validation error messages */
  errors: IErrors;

  /* User thats logged in */
  userName: string;

  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;
  /* Redirect Boolean */

  status?: string;
}

const defaultForm: IFormContext = {
  values: { null: null },
  errors: { null: "null" },
  userName: "null",
  submitSuccess: false,
  status: "inital",
  setValues: (values: IValues) => null,
  validate: (fieldName: string) => null,
};

export const FormContext = React.createContext<IFormContext>(defaultForm);

export class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IErrors = {};
    const values: IValues = {};
    this.state = {
      userName: "string",
      errors,
      values,
    };
  }

  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };
  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (this.validateForm()) {
      await this.submitForm();
    }
  };

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Returns true if the form is valid
   */
  private validateForm(): boolean {
    const errors: IErrors = {};
    Object.keys(this.props.fields).map((fieldName: string) => {
      errors[fieldName] = this.validate(fieldName);
    });
    this.setState({ errors });
    return !this.haveErrors(errors);
  }

  private async submitForm(): Promise<boolean> {
    try {
      const cookies = new Cookies();
      this.setState({ status: "loading" });
      let url = null;
      let method = null;
      let body = null;
      if (this.props.register) {
        url =
          "https://healthmonitoringapi.azurewebsites.net/api/Authenticate/register";
        method = "post";
        body = JSON.stringify(this.state.values);
      } else if (this.props.appointment) {
        url = `https://healthmonitoringapi.azurewebsites.net/api/Appointment/${this.props.userName}`;
        method = "post";
        body = JSON.stringify(this.state.values);
      } else if (this.props.edit) {
        url = `https://healthmonitoringapi.azurewebsites.net/api/Appointment/${this.props.id}`;
        method = "put";
        this.state.values.appointmentID = this.props.id;
        body = JSON.stringify(this.state.values);
      } else {
        url =
          "https://healthmonitoringapi.azurewebsites.net/api/Authenticate/login";
        method = "post";
        body = JSON.stringify(this.state.values);
      }
      let response = "John Doe";
      if (method === "post") {
        await fetch(url, {
          method: method,
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          }),
          body,
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (body) {
            if (body.token) {
              cookies.set("jwt", body.token, { path: "/" });
              response = body.user.userName;
              return response;
            } else return null;
          });
      } else {
        await fetch(url, {
          method: method,
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          }),
          body,
        }).then(function (response) {
          return null;
        });
      }
      const submitSuccess = true;
      this.setState({ values: { null: null } });
      this.setState({ submitSuccess });
      this.setState({ userName: response });
      setTimeout(() => {
        this.setState({ status: "redirect" });
      }, 100);
      return true;
    } catch (ex) {
      return false;
    }
  }
  /**
   * Executes the validation rule for the field and updates the form errors
   * @param {string} fieldName - The field to validate
   * @returns {string} - The error message
   */
  private validate = (fieldName: string): string => {
    let newError: string = "";

    if (
      this.props.fields[fieldName] &&
      this.props.fields[fieldName].validation
    ) {
      newError = this.props.fields[fieldName].validation!.rule(
        this.state.values,
        fieldName,
        this.props.fields[fieldName].validation!.args
      );
    }
    this.state.errors[fieldName] = newError;
    this.setState({
      errors: { ...this.state.errors, [fieldName]: newError },
    });
    return newError;
  };

  public render() {
    const { submitSuccess, errors, status } = this.state;
    const { register, handleUserInput, appointment, edit } = this.props;

    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate,
    };
    return (
      <FormContext.Provider value={context}>
        <FormContext.Consumer>
          {(appContext: IFormContext) => (
            <form onSubmit={this.handleSubmit} noValidate={true}>
              <div className="container">
                {this.props.render()}
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={this.haveErrors(errors)}
                  >
                    Submit
                  </button>
                  {!edit ? (
                    !appointment ? (
                      !register ? (
                        <Typography
                          className="register-link"
                          variant="subtitle1"
                        >
                          <Link to="/Register">New user? Register here</Link>
                        </Typography>
                      ) : (
                        <Typography
                          className="register-link"
                          variant="subtitle1"
                        >
                          <Link to="/SignIn">
                            Already have an account? Sign in
                          </Link>
                        </Typography>
                      )
                    ) : null
                  ) : null}

                  {}
                </div>
                {status === "redirect" ? <Redirect to="/dashboard" /> : null}
                {submitSuccess ? (
                  handleUserInput ? (
                    handleUserInput(this.state.userName)
                  ) : null
                ) : status === "loading" ? (
                  <CircularProgress />
                ) : null}
                {submitSuccess === false && !this.haveErrors(errors) && (
                  <div className="alert alert-danger" role="alert">
                    Sorry, an unexpected error has occurred
                  </div>
                )}
                {submitSuccess === false && this.haveErrors(errors) && (
                  <div className="alert alert-danger" role="alert">
                    Sorry, the form is invalid. Please review, adjust and try
                    again
                  </div>
                )}
              </div>
            </form>
          )}
        </FormContext.Consumer>
      </FormContext.Provider>
    );
  }
}

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined || values[fieldName] === null
    ? "This must be populated"
    : "";

/**
 * Validates whether a field is a valid email
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "This must be in a valid email format"
    : "";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
// export const maxLength = (
//   values: IValues,
//   fieldName: string,
//   length: number
// ): string =>
//   values[fieldName] && values[fieldName].length > length
//     ? `This can not exceed ${length} characters`
//     : "";

export default Form;
