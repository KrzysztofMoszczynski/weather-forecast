import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import logoSmall from "../assets/images/logo.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StatisticalSearch from "../components/statistical-search";
import SmallBox from "../components/small-box";
import TemperatureBox from "../components/temperature-box";

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
  foundCityMessage: {
    fontSize: 20,
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
  const [dataLoaded, setDataLoaded] = useState(true);

  const handleSearch = (city, month, day) => {
    console.log(city + "  " + month + "  " + day);
  };

  return (
    <div className={classes.pageStyle}>
      <Grid container direction='column' spacing={2}>
        <Grid item container justify='space-between'>
          <Grid item xs={4}>
            <img src={logoSmall} className={classes.logo} />
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
            <Grid item>
              <div className={classes.foundCityMessage}>
                <p>Warsaw, PL</p>
                <p>Statistical data for 10th of May</p>
              </div>
              {/*<SmallBox label='label' value='100' units='W' />*/}
              <TemperatureBox average='10' max='13' min='8' />
            </Grid>
          ) : (
            <Grid item>
              <div className={classes.noCityMessage}>
                <p>
                  Ooops... it seems like we don't have your city in database.
                </p>
                <p>Try another city or check if there is no typo.</p>
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Statistical;
