import React from "react";
import Typography from "@material-ui/core/Typography";
import AppointmentForm from "./AppointmentForm";

interface DashboardProps {
  userName: string;
}

function Appointment(Props: DashboardProps) {
  return (
    <div className="sign-in-wrapper">
      <Typography variant="h4" component="h4">
        Add a new Appointment
      </Typography>
      <AppointmentForm userName={Props.userName} />
    </div>
  );
}

export default Appointment;
