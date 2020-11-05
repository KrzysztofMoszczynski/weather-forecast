import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    searchBar: {
        //height: '60px',
        width: '300px',
        backgroundColor: 'white',
    }
})

function CityFinder() {
    const classes = useStyles();

    return(
        <div>
            <TextField id='outlined-basic' variant='outlined' className={classes.searchBar}>
                <SearchIcon/>
            </TextField>
        </div>
    )
}

export default CityFinder;