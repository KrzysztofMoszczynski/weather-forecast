import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  searchBar: {
    margin: "auto",
    padding: 10,
    paddingLeft: 30,
    height: 30,
    width: 300,
    borderRadius: 8,
    backgroundColor: "white",
    display: "flex",
  },
  searchInput: {},
  searchIcon: {
    marginLeft: 40,
  },
});

function CityFinder(props) {
  const classes = useStyles();
  const [choosenCity, setCity] = useState(null);
  const [value, setValue] = useState("");
  const handleChange = e => setValue(e.target.value);

  async function fetchCities() {
    // database daj miasta
    console.log("city fetched");
  }

  function handleSearchButtonClick() {
    chooseCity();
    props.handleSearch();
  }

  function chooseCity() {
    console.log(value);
    setValue("");
  }

  useEffect(() => {
    fetchCities();
  });

  return (
    <div className={classes.searchBar}>
      <div className={classes.searchInput}>
        {/*<TextField
        id='outlined-basic'
        variant='outlined'
        className={classes.searchBar}
      >
        </TextField>*/}
        <InputBase
          placeholder='Search city'
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className={classes.searchIcon}>
        <Button onClick={handleSearchButtonClick}>
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}

export default CityFinder;
