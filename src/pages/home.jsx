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
  noCityMessage: {
    color: "#FF0000",
    fontSize: 15,
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

  function handleSearch() {
    setCityNotFound(!cityNotFound);
  }

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
      <CityFinder handleSearch={handleSearch} />
      {cityNotFound && <Link to='/mainweather'>Dowiedz się więcej</Link>}
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
