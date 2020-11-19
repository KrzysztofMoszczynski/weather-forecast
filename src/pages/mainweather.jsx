import React, { useState, useEffect } from "react";
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

function MainWeather({ weatherData, cityData }) {
  const classes = useStyles();
  const [dayWindows, setDayWindows] = useState(null);
  const [weatherArray, setWeatherArray] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  function fetch() {
    console.log(weatherData);
    console.log(cityData);
    const dayWindowsArray = [0, 1, 2, 3, 4];
    setDayWindows(dayWindowsArray);
    fetchWeatherArray();
  }

  function fetchWeatherArray() {
    let helpArray = [];
    for (let i = 0; i < weatherData.length; i++) {
      if (i % 8 == 0) helpArray.push([]);
      helpArray[parseInt(i / 8, 10)].push(weatherData[i]);
    }
    console.log(helpArray);
    setWeatherArray(helpArray);
  }

  useEffect(() => {
    if (weatherArray) {
      setDataLoaded(true);
    }
  }, [weatherArray]);

  useEffect(() => {
    fetch();
  }, []);

  if (dataLoaded) {
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
                Weather for: <br />{" "}
                {cityData.cityName + ", " + cityData.countryCode}
              </Typography>
            </Grid>
            <Grid item>
              <Clock />
            </Grid>
          </Grid>
        </div>
        {dayWindows &&
          dayWindows.map(dayWindow => <DayWindow key={dayWindow} />)}
      </div>
    );
  } else {
    return <></>;
  }
}

export default MainWeather;
