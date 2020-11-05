import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import logoBig from '../assets/images/logo.png';
import CityFinder from '../components/city-finder';

const useStyles = makeStyles(theme => ({
    pageStyle: {
      textAlign: 'center',
      marginTop: '50px'
    }
  }));

const logo = {
    src: logoBig,
    alt: 'logo',
    width: '20%',
    height: '20%'
};

function Home() {
    const classes = useStyles();

    return(
        <div className={classes.pageStyle}>
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height}/>
            <Typography variant='h5'>
                Type the city you want to check the weather for:
            </Typography>
            <CityFinder/>
            <Link to='/mainweather'>
                Dowiedz się
            </Link>
        </div>
    )
}

export default Home;