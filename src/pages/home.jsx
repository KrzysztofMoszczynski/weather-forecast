import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import logoBig from "../assets/images/logo.png";
import InfoIcon from "@material-ui/icons/Info";
import CityFinder from "../components/city-finder";
import database from "../api/openWeatherMap";

const useStyles = makeStyles({
  pageStyle: {
    textAlign: "center",
    marginTop: "30px",
  },
  logo: {
    width: "20%",
    height: "20%",
    marginLeft: 75,
  },
  typeCityText: {
    marginBottom: 30,
  },
  noCityMessage: {
    color: "#FF0000",
    fontSize: 15,
  },
  infoIcon: {
    fontSize: 40,
    paddingRight: 30,
    float: "right",
    cursor: "pointer",
  },
});

function Home({ setWeatherData, setCityData, dataLoaded, setDataLoaded }) {
  const classes = useStyles();
  const [cityNotFound, setCityNotFound] = useState(false);
  const [cityName, setCityName] = useState("");
  const [redirect, setRedirect] = useState(null);
  let history = useHistory();

  function handleSearch(cityName) {
    setCityName(cityName);
    fetchWeather(cityName);
  }

  function handleInfoClick() {
    history.push("/about");
  }

  async function fetchWeather(choosenCityName) {
    const weather = await database.getWeatherByCityName(choosenCityName);
    if (weather == false) {
      setCityNotFound(true);
    } else {
      setCityData(weather[0]);
      setWeatherData(weather[1]);
      setCityNotFound(false);
    }
  }

  useEffect(() => {
    if (dataLoaded) {
      history.push("./mainweather");
      setDataLoaded(false);
    }
  }, [dataLoaded]);

  return (
    <div className={classes.pageStyle}>
      <img src={logoBig} className={classes.logo} />
      <InfoIcon className={classes.infoIcon} onClick={handleInfoClick} />
      <Typography variant='h5' className={classes.typeCityText}>
        Type the city you want to check the weather for:
      </Typography>
      <CityFinder handleSearch={handleSearch} />
      {cityNotFound && (
        <div className={classes.noCityMessage}>
          <p>Ooops... it seems like we don't have your city in database.</p>
          <p>Try another city or check if there is no typo.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
