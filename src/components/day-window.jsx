import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import SunIcon from "../assets/images/sun.png";
import CloudIcon from "../assets/images/cloud.png";
import RainIcon from "../assets/images/rain.png";
import HailIcon from "../assets/images/hail.png";
import StormIcon from "../assets/images/storm.png";
import HeavyRainIcon from "../assets/images/heavy-rain.png";
import CloudsAndSunIcon from "../assets/images/clouds-and-sun.png";
import FogIcon from "../assets/images/fog.png";
import SnowIcon from "../assets/images/snow.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  smallContainer: {
    backgroundColor: "#273DFF",
    color: "#EFEFEF",
    padding: 10,
    margin: 20,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
    "& p": {
      margin: 1,
    },
  },
  avgIcon: {
    width: 80,
    height: 80,
  },
  minMaxTemp: {
    textAlign: "right",
    fontSize: 30,
  },
  minTemp: {
    opacity: "50%",
  },
  avgPressureHumidity: {
    textAlign: "center",
    fontSize: 23,
  },
  avgPressureHumidityValue: {
    fontSize: 28,
  },
  dateUnderDay: {
    fontSize: 20,
  },
  expandIcon: {
    fontSize: 45,
    textAlign: "center",
    marginTop: 20,
  },
});

function DayWindow() {
  const classes = useStyles();
  const [avgIcon, setAvgIcon] = useState(null);
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [avgPressure, setAvgPressure] = useState("");
  const [avgHumidity, setAvgHumidity] = useState("");

  async function fetch() {
    setAvgIcon(SunIcon);
    setMinTemp(3 + "°");
    setMaxTemp(12 + "°");
    setAvgPressure(1030 + "hPa");
    setAvgHumidity(60 + "%");
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={classes.smallContainer}>
      <Grid container spacing={6}>
        <Grid item xs={2}>
          <img src={avgIcon} className={classes.avgIcon} />
        </Grid>
        <Grid item xs={1} className={classes.minMaxTemp}>
          <p>{maxTemp}</p>
          <p className={classes.minTemp}>{minTemp}</p>
        </Grid>
        <Grid item xs={3} className={classes.avgPressureHumidity}>
          <p>Pressure:</p>
          <p className={classes.avgPressureHumidityValue}>{avgPressure}</p>
        </Grid>
        <Grid item xs={2} className={classes.avgPressureHumidity}>
          <p>Humidity:</p>
          <p className={classes.avgPressureHumidityValue}>{avgHumidity}</p>
        </Grid>
        <Grid item xs={3} className={classes.minMaxTemp}>
          <p>Friday</p>
          <p className={classes.dateUnderDay}>06 November</p>
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.expandIcon}>
            <ExpandMoreIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default DayWindow;
