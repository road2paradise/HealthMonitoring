import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <Typography variant="h4" component="h4">
        Welcome to HealthyOrg!
      </Typography>
      <Typography variant="h6" component="h6">
        Please click on sign in on the top right hand side to get started!
      </Typography>
    </div>
  );
}

export default Home;
