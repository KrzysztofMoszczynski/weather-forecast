import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TemperatureBox from "../components/temperature-box";
import SmallBox from "../components/small-box";

const useStyles = makeStyles({
  cityText: {
    fontSize: 20,
    textAlign: "center",
  },
  smallBox: {
    marginBottom: 50,
  },
  containerLeft: {
    marginRight: 50,
  },
  containerRight: {
    marginLeft: 50,
  },
});

const StatisticalDisplay = ({ cityData, statisticalData }) => {
  const classes = useStyles();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <div className={classes.cityText}>
        <p>
          {cityData.name}, {cityData.country}
        </p>
        <p>
          Statistical data for {months[statisticalData.month - 1]},{" "}
          {statisticalData.day}
        </p>
      </div>
      <Grid container direction='row' spacing={10}>
        <Grid
          item
          container
          direction='column'
          xs
          className={classes.containerLeft}
        >
          <Grid item className={classes.smallBox}>
            <SmallBox
              label='Average Pressure'
              value={parseInt(statisticalData.avgPressure)}
              units='hPa'
            />
          </Grid>
          <Grid item>
            <SmallBox
              label='Average Humidity'
              value={parseInt(statisticalData.avgHumidity)}
              units='%'
            />
          </Grid>
        </Grid>
        <Grid item xs>
          <TemperatureBox
            average={parseInt(statisticalData.temperature.avg - 273.15)}
            max={parseInt(statisticalData.temperature.avgMax - 273.15)}
            min={parseInt(statisticalData.temperature.avgMin - 273.15)}
          />
        </Grid>
        <Grid
          item
          container
          direction='column'
          xs
          className={classes.containerRight}
        >
          <Grid item className={classes.smallBox}>
            <SmallBox
              label='Average Wind Speed'
              value={statisticalData.avgWind}
              units='kmph'
            />
          </Grid>
          <Grid item>
            <SmallBox
              label='Average Precipitation'
              value={statisticalData.avgPrecipitation}
              units='mm'
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticalDisplay;
