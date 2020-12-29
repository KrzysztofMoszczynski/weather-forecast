import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  cityWindow: {
    margin: "auto",
    padding: 10,
    paddingLeft: 30,
    height: 30,
    width: 200,
    borderRadius: 8,
    backgroundColor: "white",
    display: "flex",
    border: "1px solid gray",
  },
  formControl: {
    width: 150,
  },
  select: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  searchIcon: {
    marginTop: 10,
  },
});

const StatisticalSearch = ({ handleSearch }) => {
  const classes = useStyles();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayList, setDayList] = useState([]);
  const [dayDisabled, setDayDisabled] = useState(true);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [city, setCity] = useState("");
  const handleChange = e => setCity(e.target.value);

  const handleMonthChange = event => {
    setMonth(event.target.value);
    setDay("");
    let dayListTemp = [];
    let numberOfDays = 0;
    if ([1, 3, 5, 7, 8, 10, 12].includes(event.target.value)) {
      numberOfDays = 31;
    } else if (event.target.value == 2) {
      numberOfDays = 29;
    } else {
      numberOfDays = 30;
    }
    for (let i = 0; i < numberOfDays; i++) {
      dayListTemp.push(i + 1);
    }
    setDayList(dayListTemp);
    console.log(dayListTemp);
  };

  const handleDayChange = event => {
    setDay(event.target.value);
  };

  const handleSearchButtonClick = () => {
    handleSearch(city, month, day);
  };

  useEffect(() => {
    if (dayList.length > 0) {
      setDayDisabled(false);
    }
  }, [dayList]);

  useEffect(() => {
    if (city != "" && (month != "") & (day != "")) {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  }, [city, month, day]);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs>
          <div className={classes.cityWindow}>
            <InputBase
              placeholder='Search city'
              value={city}
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='month-label'>Month</InputLabel>
            <Select
              labelId='month-label'
              id='month'
              value={month}
              onChange={handleMonthChange}
              label='Month'
              className={classes.select}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl
            className={classes.formControl}
            variant='outlined'
            disabled={dayDisabled}
          >
            <InputLabel id='day-label'>Day</InputLabel>
            <Select
              labelId='day-label'
              value={day}
              onChange={handleDayChange}
              label='Day'
              className={classes.select}
            >
              {dayList.length > 0 &&
                dayList.map(day => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.searchIcon}
            onClick={handleSearchButtonClick}
            disabled={searchDisabled}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticalSearch;
