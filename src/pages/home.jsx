import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import logoBig from "../assets/images/logo.png";
import CityFinder from "../components/city-finder";

const useStyles = makeStyles(theme => ({
  pageStyle: {
    textAlign: "center",
    marginTop: "50px",
  },
  typeCityText: {
    marginBottom: 30,
  },
}));

const logo = {
  src: logoBig,
  alt: "logo",
  width: "20%",
  height: "20%",
};

function Home() {
  const classes = useStyles();
  const [cityNotFound, setCityNotFound] = useState(true);

  return (
    <div className={classes.pageStyle}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
      />
      <Typography variant='h5' className={classes.typeCityText}>
        Type the city you want to check the weather for:
      </Typography>
      <CityFinder />
      {cityNotFound && <Link to='/mainweather'>Dowiedz się więcej</Link>}
    </div>
  );
}

export default Home;
