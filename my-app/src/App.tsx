import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Dashboard, { IAppointment } from "./components/Dashboard";
import Appointment from "./components/Appointment";
import Edit from "./components/Edit";

interface IApp {
  handleUserInput: any;
  handleAppointmentData: any;
}

function App() {
  const [userName, setUserName] = useState("null");
  const [appointmentData, setAppointmentData] = useState<IAppointment>({
    appointmentID: 0,
    appointmentText: "null",
    appointmentDesc: "null",
    appointmentType: "null",
    doctorsName: "null",
  });
  const handleUserInput = (user: string) => {
    return setUserName(user);
  };
  const handleAppointmentData = (
    appointmentDesc: string,
    appointmentID: number,
    appointmentText: string,
    appointmentType: string,
    doctorsName: string
  ) => {
    setAppointmentData({
      appointmentID: appointmentID,
      appointmentText: appointmentText,
      appointmentType: appointmentType,
      doctorsName: doctorsName,
      appointmentDesc: appointmentDesc,
    });
  };

  return (
    <Router>
      <div className="App">
        <Header userName={userName} />
      </div>
      <Switch>
        <Route path="/appointment">
          <Appointment userName={userName} />
        </Route>
        <Route path="/edit">
          <Edit appointment={appointmentData} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            userName={userName}
            handleAppointmentData={handleAppointmentData}
          />
        </Route>
        <Route path="/SignIn">
          <SignIn handleUserInput={handleUserInput} />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
