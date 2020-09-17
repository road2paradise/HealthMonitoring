import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Card from "./Card";
import Cookies from "universal-cookie";

import "./Dashboard.css";

interface DashboardProps {
  userName: string;
  handleAppointmentData: any;
}
export interface IAppointment {
  appointmentDesc: string;
  appointmentID: number;
  appointmentText: string;
  appointmentType: string;
  doctorsName: string;
  handleDelete?: any;
  handleEdit?: any;
}

function Dashboard(Props: DashboardProps) {
  const { userName } = Props;
  const handleDelete = (id: number) => {
    const cookies = new Cookies();
    fetch(`https:healthmonitoringapi.azurewebsites.net/api/Appointment/${id}`, {
      method: "delete",
      headers: new Headers({
        Authorization: `Bearer ${cookies.get("jwt")}`,
      }),
    });
    setAppointments(
      appointments.filter((appointment) => appointment.appointmentID !== id)
    );
  };

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  useEffect(() => {
    const cookies = new Cookies();
    fetch(
      `https://healthmonitoringapi.azurewebsites.net/api/Appointment/${userName}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${cookies.get("jwt")}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => setAppointments(response));
  }, []);

  const handleEdit = (id: number) => {
    let curAppointment = appointments.filter(
      (appointment) => appointment.appointmentID === id
    );
    Props.handleAppointmentData(
      curAppointment[0].appointmentDesc,
      id,
      curAppointment[0].appointmentText,
      curAppointment[0].appointmentType,
      curAppointment[0].doctorsName
    );
  };

  return (
    <div className="dashboard-wrapper">
      <Typography variant="h4" component="h4">
        Hello {userName}! Welcome to your dashboard.
      </Typography>
      <Typography variant="h6" component="h6">
        Your upcoming appointments:
        {appointments.map((e) => (
          <Card
            appointmentDesc={e.appointmentDesc}
            appointmentType={e.appointmentType}
            appointmentText={e.appointmentText}
            appointmentID={e.appointmentID}
            doctorsName={e.doctorsName}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </Typography>
    </div>
  );
}

export default Dashboard;
