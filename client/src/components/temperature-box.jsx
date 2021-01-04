import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  box: {
    height: 470,
    width: 300,
    backgroundColor: "#00031F",
    color: "#F8F8F8",
    borderRadius: 10,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    "& p": {
      margin: 8,
    },
  },
  title: {
    fontSize: 30,
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 40,
  },
});

const TemperatureBox = ({ average, max, min }) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <p className={classes.title}>Temperature</p>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <p className={classes.label}>Average</p>
          <p className={classes.value}>{average + "°C"}</p>
        </Grid>
        <Grid item>
          <p className={classes.label}>Average max</p>
          <p className={classes.value}>{max + "°C"}</p>
        </Grid>
        <Grid item>
          <p className={classes.label}>Average min</p>
          <p className={classes.value}>{min + "°C"}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default TemperatureBox;
