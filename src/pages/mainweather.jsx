import React from "react";
import { makeStyles } from "@material-ui/core";
import cyan from "@material-ui/core/colors/cyan";
import Clock from "../components/clock";

const useStyles = makeStyles(theme => ({
  pageStyle: {
    background: cyan[400],
  },
}));

function MainWeather() {
  const classes = useStyles();

  return (
    <div className={classes.pageStyle}>
      <Clock />
    </div>
  );
}

export default MainWeather;
