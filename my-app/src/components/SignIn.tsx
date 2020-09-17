import React from "react";
import { Typography } from "@material-ui/core";
import "./SignIn.css";
import { SignInForm } from "./SignInForm";
interface SignInProps {
  handleUserInput: (user: string) => void;
}

function SignIn(Props: SignInProps) {
  return (
    <div className="sign-in-wrapper">
      <Typography variant="h4" component="h4">
        Please Sign in
      </Typography>
      <SignInForm handleUserInput={Props.handleUserInput} />
    </div>
  );
}

export default SignIn;
