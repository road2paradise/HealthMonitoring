import React from "react";
import { CircularProgress as Progress } from "@material-ui/core";

const CircularProgress = () => (
  <div
    style={{
      height: "100vh",
      margin: "10% 50%",
    }}
  >
    <Progress disableShrink />
  </div>
);

export default CircularProgress;
