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
    border: "2px solid #141414",
  },
  searchIcon: {
    marginLeft: 40,
  },
});

const CityFinder = props => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = e => setValue(e.target.value);

  const handleSearchButtonClick = () => {
    setValue("");
    props.handleSearch(value);
  };

  return (
    <div className={classes.searchBar}>
      <div className={classes.searchInput}>
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
};

export default CityFinder;
