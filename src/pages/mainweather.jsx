import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Clock from "../components/clock";
import logoBig from "../assets/images/logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DayWindow from "../components/day-window";
import ChooseCityButton from "../components/choose-city-button";

const useStyles = makeStyles({
  contentContainer: {
    margin: 30,
    marginTop: 10,
  },
  topBar: {
    display: "flex",
  },
  logoTop: {},
  cityDisplay: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

const logo = {
  src: logoBig,
  alt: "logo",
  width: "80%",
  height: "90%",
};

const MainWeather = ({ weatherData, cityData }) => {
  const classes = useStyles();
  let history = useHistory();
  const [weatherArray, setWeatherArray] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchWeatherArray = () => {
    let helpArray = [];
    for (let i = 0; i < weatherData.length; i++) {
      if (i % 8 == 0) helpArray.push([]);
      helpArray[parseInt(i / 8, 10)].push(weatherData[i]);
    }
    setWeatherArray(helpArray);
  };

  useEffect(() => {
    if (weatherArray) {
      setDataLoaded(true);
    }
  }, [weatherArray]);

  useEffect(() => {
    if (weatherData == null || cityData == null) {
      history.push("/");
    } else {
      fetchWeatherArray();
    }
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
              <ChooseCityButton />
              <Typography variant='h5' className={classes.cityDisplay}>
                Weather for: <br />{" "}
                {cityData.cityName + ", " + cityData.countryCode}
              </Typography>
            </Grid>
            <Grid item>
              <Clock timezone={cityData.timezone} />
            </Grid>
          </Grid>
        </div>
        {weatherArray &&
          weatherArray.map((weatherArrayItem, index) => (
            <DayWindow
              key={index}
              weatherData={weatherArrayItem}
              timezone={cityData.timezone}
            />
          ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MainWeather;
