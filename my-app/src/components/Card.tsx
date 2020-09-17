import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { IAppointment } from "./Dashboard";
import { useHistory } from "react-router-dom";
import "./Card.css";

// Themes and styling.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "50px",
    margin: "auto",
    maxWidth: 500,
  },
}));

function Card(Props: IAppointment) {
  const classes = useStyles();
  const history = useHistory();

  const {
    appointmentDesc,
    appointmentID,
    appointmentText,
    doctorsName,
  } = Props;

  const handleDeleteEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    Props.handleDelete(parseInt(e.currentTarget.value));
  };
  const handleEditEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    Props.handleEdit(parseInt(e.currentTarget.value));
    console.log(e.currentTarget.value);
    history.push("/edit");
  };
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h3">
                    {appointmentText}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {appointmentDesc}
                  </Typography>
                  <Typography variant="subtitle1">
                    Appointment made with: {doctorsName}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Button
                    className="edit-btn"
                    variant="contained"
                    color="primary"
                    startIcon={<CreateIcon />}
                    size="small"
                    value={appointmentID}
                    onClick={handleEditEntry}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="remove-btn"
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    value={appointmentID}
                    onClick={handleDeleteEntry}
                    size="small"
                  >
                    REMOVE
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default Card;
