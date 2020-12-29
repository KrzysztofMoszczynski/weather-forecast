import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles({
  clockStyle: {
    background: grey[100],
    width: 200,
    height: 100,
    paddingRight: 10,
    paddingBottom: 5,
    textAlign: "right",
  },
  upperHour: {
    fontSize: 30,
    fontWeight: "bold",
  },
  lowerDate: {
    fontSize: 20,
  },
});

const Clock = ({ timezone }) => {
  const classes = useStyles();
  const [time, setTime] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const fetchTime = () => {
    let newTime = new Date();
    let localOffset = newTime.getTimezoneOffset();
    newTime.setTime(
      newTime.getTime() + localOffset * 60 * 1000 + timezone * 1000
    );
    if (newTime.getSeconds() < 10) {
      setSeconds("0" + newTime.getSeconds());
    } else {
      setSeconds(newTime.getSeconds());
    }
    if (newTime.getMinutes() < 10) {
      setMinutes("0" + newTime.getMinutes());
    } else {
      setMinutes(newTime.getMinutes());
    }
    if (newTime.getHours() < 10) {
      setHours("0" + newTime.getHours());
    } else {
      setHours(newTime.getHours());
    }
    setTime(newTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time) {
    return (
      <div className={classes.clockStyle}>
        <p className={classes.upperHour}>
          {hours}:{minutes}:{seconds}
        </p>
        <p className={classes.lowerDate}>{time.toDateString()}</p>
      </div>
    );
  } else {
    return (
      <div className={classes.clockStyle}>
        <p className={classes.upperHour}>Loading...</p>
      </div>
    );
  }
};

export default Clock;
