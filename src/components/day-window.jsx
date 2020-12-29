import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import SunIcon from "../assets/images/sun.png";
import CloudIcon from "../assets/images/cloud.png";
import RainIcon from "../assets/images/rain.png";
import StormIcon from "../assets/images/storm.png";
import HeavyRainIcon from "../assets/images/heavy-rain.png";
import CloudsAndSunIcon from "../assets/images/clouds-and-sun.png";
import FogIcon from "../assets/images/fog.png";
import SnowIcon from "../assets/images/snow.png";
import CloudsAndMoonIcon from "../assets/images/clouds-and-moon.png";
import MoonIcon from "../assets/images/moon.png";
import TornadoIcon from "../assets/images/tornado.png";
import NoPhotoIcon from "../assets/images/no-photo.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#00031F",
    color: "#EFEFEF",
    padding: 10,
    margin: 20,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 10,
    "& p": {
      margin: 1,
    },
  },
  topContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  leftTopContainer: {
    marginTop: 50,
  },
  rightTopContainer: {
    fontSize: 30,
    paddingRight: 40,
    paddingLeft: 10,
    borderLeft: "solid",
    borderWidth: 1,
  },
  sectionsAlignment: {
    marginTop: 17,
  },
  rightTopValues: {
    textAlign: "right",
  },
  weatherBar: {
    textAlign: "center",
  },
  avgIcon: {
    width: 80,
    height: 80,
  },
  bigIcon: {
    width: 150,
    height: 150,
  },
  smallIcon: {
    width: 60,
    height: 60,
  },
  minMaxTemp: {
    textAlign: "right",
    fontSize: 30,
  },
  currentTemp: {
    fontSize: 35,
    textAlign: "center",
  },
  minTemp: {
    opacity: "50%",
  },
  avgPressureHumidity: {
    textAlign: "center",
    fontSize: 23,
  },
  specificTemperature: {
    fontSize: 30,
  },
  avgPressureHumidityValue: {
    fontSize: 28,
  },
  dateUnderDay: {
    fontSize: 20,
  },
  expandButton: {
    textAlign: "center",
    marginTop: 22,
    width: 40,
    height: 40,
  },
  foldButton: {
    float: "right",
    width: 40,
    height: 40,
  },
  expandIcon: {
    fontSize: 30,
    color: "#C4C4C4",
  },
  foldIcon: {
    fontSize: 30,
    color: "#C4C4C4",
    transform: "rotate(180deg)",
  },
  unCheckedHour: {
    cursor: "pointer",
  },
  checkedHour: {
    border: "solid",
    borderRadius: 15,
  },
});

const DayWindow = ({ weatherData, timezone }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [avgIcon, setAvgIcon] = useState(null);
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [avgPressure, setAvgPressure] = useState("");
  const [avgHumidity, setAvgHumidity] = useState("");
  const [tempList, setTempList] = useState(null);
  const [iconsList, setIconsList] = useState(null);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [hours, setHours] = useState(null);
  const [dates, setDates] = useState(null);
  const [pressureList, setPressureList] = useState(null);
  const [humidityList, setHumidityList] = useState(null);

  const fetch = () => {
    fetchPressure();
    fetchHumidity();
    fetchDatesAndHours();
    fetchTemperatures();
  };

  const fetchPressure = () => {
    let helpPressure = [];
    let sum = 0;
    for (let i = 0; i < weatherData.length; i++) {
      helpPressure.push(weatherData[i].pressure);
      sum += weatherData[i].pressure;
    }
    let avgPressure = parseInt(sum / weatherData.length);
    setAvgPressure(avgPressure);
    setPressureList(helpPressure);
  };

  const fetchHumidity = () => {
    let helpHumidity = [];
    let sum = 0;
    for (let i = 0; i < weatherData.length; i++) {
      helpHumidity.push(weatherData[i].humidity);
      sum += weatherData[i].humidity;
    }
    let avgHumidity = parseInt(sum / weatherData.length);
    setAvgHumidity(avgHumidity);
    setHumidityList(helpHumidity);
  };

  const fetchDatesAndHours = () => {
    let helpHours = [];
    let helpDates = [];
    let hourToFormat;
    let minutesToFormat;
    let hours;
    let minutes;
    let hoursAndMinutes;
    for (let i = 0; i < weatherData.length; i++) {
      let dateToFormat = new Date(Date.parse(weatherData[i].dateTime));
      let localOffset = dateToFormat.getTimezoneOffset();
      dateToFormat.setTime(
        dateToFormat.getTime() + localOffset * 60 * 1000 + timezone * 1000
      );
      hours = dateToFormat.getHours();
      minutes = dateToFormat.getMinutes();
      if (hours < 10) hourToFormat = "0" + hours;
      else hourToFormat = hours;
      if (minutes < 10) minutesToFormat = "0" + minutes;
      else minutesToFormat = minutes;
      hoursAndMinutes = hourToFormat + ":" + minutesToFormat;
      dateToFormat = dateToFormat.toDateString().split(" ");
      helpDates.push({
        dayOfWeek: dateToFormat[0],
        month: dateToFormat[1],
        day: dateToFormat[2],
      });
      helpHours.push(hoursAndMinutes);
    }
    setHours(helpHours);
    setDates(helpDates);
    fetchIcons(helpHours);
  };

  const fetchTemperatures = () => {
    let tempList = [];
    let helpTemp;
    let maxTemp = -100;
    let minTemp = 100;
    for (let i = 0; i < weatherData.length; i++) {
      helpTemp = Math.round(weatherData[i].temperature - 273.15);
      if (helpTemp > maxTemp) maxTemp = helpTemp;
      if (helpTemp < minTemp) minTemp = helpTemp;
      helpTemp += "°C";
      tempList.push(helpTemp);
    }
    minTemp += "°C";
    maxTemp += "°C";
    setMinTemp(minTemp);
    setMaxTemp(maxTemp);
    setTempList(tempList);
  };

  const fetchIcons = helpHours => {
    let helpIconArray = [];
    let weatherMain;
    let weatherDescription;
    let helpHour;
    for (let i = 0; i < weatherData.length; i++) {
      weatherMain = weatherData[i].weatherMain;
      weatherDescription = weatherData[i].weatherDescription;
      helpHour = parseInt(helpHours[i].substring(0, 2));
      if (weatherMain == "Clear") {
        if (helpHour >= 6 && helpHour <= 20) {
          helpIconArray.push(SunIcon);
        } else {
          helpIconArray.push(MoonIcon);
        }
      } else if (
        ["broken clouds", "scattered clouds", "few clouds"].includes(
          weatherDescription
        )
      ) {
        if (helpHour >= 6 && helpHour <= 20) {
          helpIconArray.push(CloudsAndSunIcon);
        } else {
          helpIconArray.push(CloudsAndMoonIcon);
        }
      } else if (weatherDescription == "overcast clouds") {
        helpIconArray.push(CloudIcon);
      } else if (["Rain", "Drizzle"].includes(weatherMain)) {
        if (
          [
            "light rain",
            "moderate rain",
            "freezing rain",
            "light intensity shower rain",
          ].includes(weatherDescription) ||
          weatherMain == "Drizzle"
        ) {
          helpIconArray.push(RainIcon);
        } else {
          helpIconArray.push(HeavyRainIcon);
        }
      } else if (weatherMain == "Thunderstorm") {
        helpIconArray.push(StormIcon);
      } else if (weatherMain == "Snow") {
        helpIconArray.push(SnowIcon);
      } else if (["Mist", "Fog", "Haze"].includes(weatherMain)) {
        helpIconArray.push(FogIcon);
      } else if (weatherMain == "Tornado") {
        helpIconArray.push(TornadoIcon);
      } else {
        helpIconArray.push(NoPhotoIcon);
      }
    }
    let avgIcon = mode(helpIconArray);
    setAvgIcon(avgIcon);
    setIconsList(helpIconArray);
  };

  const mode = array => {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == MoonIcon || array[i] == CloudsAndMoonIcon) continue;
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  };

  const handleExpandButton = () => {
    if (isExpanded) setIsExpanded(false);
    else setIsExpanded(true);
  };

  const handleHourClick = index => {
    setButtonIndex(index);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (iconsList && tempList && hours) {
    if (isExpanded) {
      return (
        <div className={classes.container}>
          <Grid container direction='column' spacing={2}>
            <Grid item container className={classes.topContainer}>
              <Grid item container xs={6} className={classes.leftTopContainer}>
                <Grid item xs className={classes.currentTemp}>
                  <p>{hours[buttonIndex]}</p>
                  <p>{tempList[buttonIndex]}</p>
                  <p className={classes.avgPressureHumidityValue}>
                    {weatherData[buttonIndex].weatherDescription}
                  </p>
                </Grid>
                <Grid item xs>
                  <img
                    src={iconsList[buttonIndex]}
                    className={classes.bigIcon}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                direction='column'
                className={classes.rightTopContainer}
              >
                <Grid item>
                  <IconButton
                    className={classes.foldButton}
                    onClick={handleExpandButton}
                  >
                    <ExpandMoreIcon className={classes.foldIcon} />
                  </IconButton>
                </Grid>
                <Grid item container className={classes.sectionsAlignment}>
                  <Grid item xs>
                    Pressure:
                  </Grid>
                  <Grid item xs className={classes.rightTopValues}>
                    {pressureList[buttonIndex] + "  "}hPa
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs>
                    Humidity:
                  </Grid>
                  <Grid item xs className={classes.rightTopValues}>
                    {humidityList[buttonIndex] + "  "}%
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs>
                    Wind:
                  </Grid>
                  <Grid item xs className={classes.rightTopValues}>
                    {parseInt(weatherData[buttonIndex].windSpeed) + "  "}kmph
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {tempList.length == 8 && (
              <Grid item container className={classes.weatherBar}>
                {hours.map((hour, index) =>
                  index == buttonIndex ? (
                    <Grid
                      item
                      xs
                      className={classes.checkedHour}
                      key={index}
                      onClick={() => handleHourClick(index)}
                    >
                      <img
                        src={iconsList[index]}
                        className={classes.smallIcon}
                      />
                      <p className={classes.specificTemperature}>
                        {tempList[index]}
                      </p>
                      <p>{hour}</p>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs
                      className={classes.unCheckedHour}
                      key={index}
                      onClick={() => handleHourClick(index)}
                    >
                      <img
                        src={iconsList[index]}
                        className={classes.smallIcon}
                      />
                      <p className={classes.specificTemperature}>
                        {tempList[index]}
                      </p>
                      <p>{hour}</p>
                    </Grid>
                  )
                )}
              </Grid>
            )}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
          <Grid container spacing={6}>
            <Grid item xs={2}>
              <img src={avgIcon} className={classes.avgIcon} />
            </Grid>
            <Grid item xs={1} className={classes.minMaxTemp}>
              <p>{maxTemp}</p>
              <p className={classes.minTemp}>{minTemp}</p>
            </Grid>
            <Grid item xs={3} className={classes.avgPressureHumidity}>
              <p>Pressure:</p>
              <p className={classes.avgPressureHumidityValue}>
                {avgPressure}hPa
              </p>
            </Grid>
            <Grid item xs={2} className={classes.avgPressureHumidity}>
              <p>Humidity:</p>
              <p className={classes.avgPressureHumidityValue}>{avgHumidity}%</p>
            </Grid>
            <Grid item xs={3} className={classes.minMaxTemp}>
              <p>{dates[0].dayOfWeek}</p>
              <p className={classes.dateUnderDay}>
                {dates[0].day + "  " + dates[0].month}
              </p>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                className={classes.expandButton}
                onClick={handleExpandButton}
              >
                <ExpandMoreIcon className={classes.expandIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default DayWindow;
