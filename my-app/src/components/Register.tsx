import React from "react";
import Typography from "@material-ui/core/Typography";
import RegisterForm from "./RegisterForm";
function Register() {
  return (
    <div className="sign-in-wrapper">
      <Typography variant="h4" component="h4">
        Register
      </Typography>
      <RegisterForm />
    </div>
  );
}

export default Register;
