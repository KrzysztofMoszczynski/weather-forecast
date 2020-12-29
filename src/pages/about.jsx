import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import logo from "../assets/images/logo.png";

const useStyles = makeStyles({
  mainStyle: {
    fontFamily: "Open Sans",
    paddingBottom: 50,
  },
  returnArrow: {
    transform: "rotate(180deg)",
    margin: 30,
    fontSize: 60,
    color: "#8E8E8E",
  },
  topGrid: {
    marginTop: -80,
  },
  logo: {
    width: "50%",
    float: "right",
    marginRight: 50,
  },
  mainText: {
    marginLeft: 80,
    marginRight: 100,
    marginTop: 70,
    fontSize: 22,
  },
  bottomBox: {
    width: 470,
    height: 300,
    backgroundColor: "#00031F",
    color: "#F8F8F8",
    borderRadius: 10,
    marginRight: 60,
    marginLeft: 60,
    marginTop: 30,
    padding: 25,
    fontSize: 19,
  },
  featuresText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 600,
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainStyle}>
      <Link to='/' style={{ textDecoration: "none" }}>
        <PlayArrowIcon className={classes.returnArrow} />
      </Link>
      <Grid container className={classes.topGrid}>
        <Grid item xs={5}>
          <img src={logo} className={classes.logo} />
        </Grid>
        <Grid item xs={7}>
          <p className={classes.mainText}>
            MyWeather is a project of Krzysztof Moszczyński, Information
            Technology student at Technical University of Lodz. The purpose of
            this project is to create an interesting web application displaying
            weather data for specified city. The application uses OpenWeatherMap
            API as a source of data.
          </p>
        </Grid>
      </Grid>
      <p className={classes.featuresText}>The two features of this app are:</p>
      <Grid container justify='center'>
        <Grid item>
          <div className={classes.bottomBox}>
            Displaying a 5 days weather forecast for choosen city. The API gets
            one reading for 3-hours interval. The windows represent every 24
            hours since the moment of the call. If the window is rolled up, the
            visible readings are an average of the 24-hour values, except the
            temperature. That’s the minimum and maximum. Once the user expands
            the window, they can see the specific readings and can switch
            between hours by clicking them. The clock displaed in the right top
            corner and also the hours in the weather forecast respect the
            searched city timezone.
          </div>
        </Grid>
        <Grid item>
          <div className={classes.bottomBox}>
            Showing the statistical data for choosen city and a day in the year.
            The user can see the average pressure, humidity, temperature, wind
            speed and precipitation. The data is collected from 1 January 1979
            until now. The idea of this feature is to let the users to check the
            average weather in desirable city for the remote date, so they can
            have an idea how the climate there looks like.
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
