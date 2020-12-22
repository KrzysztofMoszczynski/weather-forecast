import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  box: {
    height: 500,
    width: 300,
    backgroundColor: "#00031F",
    color: "#F8F8F8",
    borderRadius: 10,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    verticalAlign: "top",
    fontSize: 30,
  },
  value: {
    verticalAlign: "bottom",
    fontSize: 40,
  },
});

const TemperatureBox = ({ average, max, min }) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <p>Temperature</p>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <p>Average</p>
          <p>{average + "°C"}</p>
        </Grid>
        <Grid item>
          <p>Average max</p>
          <p>{max + "°C"}</p>
        </Grid>
        <Grid item>
          <p>Average min</p>
          <p>{min + "°C"}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default TemperatureBox;
