import React from "react";
import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(theme => ({
  clockStyle: {
    background: grey[100],
  },
}));

function Clock(props) {
  const time = new Date();
  const classes = useStyles();

  return (
    <div className={classes.clockStyle}>
      <p>{time.toDateString()}</p>
      <p>{time.getSeconds()}</p>
    </div>
  );
}

export default Clock;
