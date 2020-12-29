import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import logoSmall from "../assets/images/logo.png";
import Grid from "@material-ui/core/Grid";
import StatisticalSearch from "../components/statistical-search";
import StatisticalDisplay from "../components/statistical-display";
import database from "../api/openWeatherMap";

const useStyles = makeStyles({
  pageStyle: {
    marginTop: 15,
    fontFamily: "Open Sans",
    fontWeight: 600,
  },
  logo: {
    width: "30%",
    marginLeft: 30,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
  },
  search: {
    textAlign: "center",
  },
  noCityMessage: {
    color: "#FF0000",
    fontSize: 20,
    textAlign: "center",
  },
});

function Statistical() {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);
  const [statisticalData, setStatisticalData] = useState(null);
  const [cityData, setCityData] = useState(null);

  const handleSearch = async (city, month, day) => {
    console.log(city + "  " + month + "  " + day);
    const result = await database.getStatisticalData(city, month, day);
    if (result != false) {
      setCityData(result[0]);
      setStatisticalData(result[1]);
    } else {
      setDataLoaded(false);
    }
    setFirstSearch(false);
  };

  useEffect(() => {
    if (statisticalData && cityData) {
      setDataLoaded(true);
    } else {
      setDataLoaded(false);
    }
  }, [statisticalData, cityData]);

  return (
    <div className={classes.pageStyle}>
      <Grid container direction='column' spacing={2}>
        <Grid item container justify='space-between'>
          <Grid item xs={4}>
            <Link to='/' style={{ textDecoration: "none" }}>
              <img src={logoSmall} className={classes.logo} />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.title}>Choose the city and date:</div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid item container justify='center'>
          <StatisticalSearch handleSearch={handleSearch} />
        </Grid>
        <Grid item container justify='center'>
          {dataLoaded ? (
            <StatisticalDisplay
              cityData={cityData}
              statisticalData={statisticalData}
            />
          ) : firstSearch ? (
            <div></div>
          ) : (
            <div className={classes.noCityMessage}>
              <p>Ooops... it seems like we don't have your city in database.</p>
              <p>Try another city or check if there is no typo.</p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Statistical;
