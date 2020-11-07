import React from "react";
import { makeStyles } from "@material-ui/core";
import Clock from "../components/clock";
import logoBig from "../assets/images/logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DayWindow from "../components/day-window";

const useStyles = makeStyles(theme => ({
  contentContainer: {
    margin: 30,
    marginTop: 10,
  },
  topBar: {
    //margin: "auto",
    display: "flex",
  },
  logoTop: {},
  cityDisplay: {
    textAlign: "center",
    fontWeight: "bold",
  },
}));

const logo = {
  src: logoBig,
  alt: "logo",
  width: "80%",
  height: "90%",
};

function MainWeather() {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      <div className={classes.topBar}>
        <Grid
          container
          spacing={3}
          direction='row'
          justify={"space-around"}
          alignItems={"center"}
        >
          <Grid item>
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </Grid>
          <Grid item>
            <Typography variant='h5' className={classes.cityDisplay}>
              Weather for: <br /> Lodz
            </Typography>
          </Grid>
          <Grid item>
            <Clock />
          </Grid>
        </Grid>
      </div>
      <DayWindow />
    </div>
  );
}

export default MainWeather;
