import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
  linkButton: {
    backgroundColor: "#C4C4C4",
    borderRadius: 13,
    textAlign: "center",
    marginTop: 30,
    fontWeight: 600,
  },
});

const Home = ({ setWeatherData, setCityData, dataLoaded, setDataLoaded }) => {
  const classes = useStyles();
  const [cityNotFound, setCityNotFound] = useState(false);
  let history = useHistory();

  const handleSearch = cityName => {
    fetchWeather(cityName);
  };

  const handleInfoClick = () => {
    history.push("/about");
  };

  const fetchWeather = async choosenCityName => {
    const weather = await database.getWeatherByCityName(choosenCityName);
    if (weather == false) {
      setCityNotFound(true);
    } else {
      setCityData(weather[0]);
      setWeatherData(weather[1]);
      setCityNotFound(false);
    }
  };

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

      <Link to='/statistical' style={{ textDecoration: "none" }}>
        <Button className={classes.linkButton}>
          Check statistical data <br /> for choosen city
        </Button>
      </Link>
      {cityNotFound && (
        <div className={classes.noCityMessage}>
          <p>Ooops... it seems like we don't have your city in database.</p>
          <p>Try another city or check if there is no typo.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
