import React from "react";
import Typography from "@material-ui/core/Typography";
import EditForm from "./EditForm";

interface EditProps {
  appointment: any;
  handleAppointmentData?: any;
}

function Edit(Props: EditProps) {
  return (
    <div className="sign-in-wrapper">
      <Typography variant="h4" component="h4">
        Edit
      </Typography>
      {console.log(Props.appointment)}
      <EditForm appointment={Props.appointment} />
    </div>
  );
}

export default Edit;
