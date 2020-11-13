import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import SunIcon from "../assets/images/sun.png";
import CloudIcon from "../assets/images/cloud.png";
import RainIcon from "../assets/images/rain.png";
import HailIcon from "../assets/images/hail.png";
import StormIcon from "../assets/images/storm.png";
import HeavyRainIcon from "../assets/images/heavy-rain.png";
import CloudsAndSunIcon from "../assets/images/clouds-and-sun.png";
import FogIcon from "../assets/images/fog.png";
import SnowIcon from "../assets/images/snow.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Rotate90DegreesCcw } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#273DFF",
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

function DayWindow() {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [avgIcon, setAvgIcon] = useState(null);
  const [currentWeatherIcon, setcurrentWeatherIcon] = useState(null);
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [avgPressure, setAvgPressure] = useState("");
  const [avgHumidity, setAvgHumidity] = useState("");
  const [tempList, setTempList] = useState(null);
  const [tempIconsList, setTempIconsList] = useState(null);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [hoursNumber, setHoursNumber] = useState(null);

  async function fetch() {
    setAvgIcon(CloudIcon);
    setcurrentWeatherIcon(SunIcon);
    setMinTemp(3 + "°");
    setMaxTemp(12 + "°");
    setAvgPressure(1030 + "hPa");
    setAvgHumidity(60 + "%");
  }

  async function fetchTemperatures() {
    let _tempList = [
      10 + "°",
      11 + "°",
      13 + "°",
      14 + "°",
      12 + "°",
      11 + "°",
      10 + "°",
      9 + "°",
    ];
    let _tempIconsList = [
      CloudIcon,
      SunIcon,
      StormIcon,
      RainIcon,
      HailIcon,
      SnowIcon,
      FogIcon,
      HeavyRainIcon,
    ];
    let _tempHoursIndex = [0, 1, 2, 3, 4, 5, 6, 7];
    setTempList(_tempList);
    setTempIconsList(_tempIconsList);
    setHoursNumber(_tempHoursIndex);
  }

  function handleExpandButton() {
    if (isExpanded) setIsExpanded(false);
    else setIsExpanded(true);
    console.log(isExpanded);
  }

  function test() {
    console.log("test");
  }

  /*function chooseHourStyle(index) {
    if (index == buttonIndex) return classes.checkedHour;
    else return classes.unCheckedHour;
  }*/

  function handleHourClick(index) {
    setButtonIndex(index);
  }

  useEffect(() => {
    fetch();
    fetchTemperatures();
  }, []);

  if (isExpanded) {
    return (
      <div className={classes.container}>
        <Grid container direction='column' spacing={2}>
          <Grid item container className={classes.topContainer}>
            <Grid item container xs={6} className={classes.leftTopContainer}>
              <Grid item xs className={classes.currentTemp}>
                <p>Now</p>
                <p>12°</p>
                <p className={classes.avgPressureHumidityValue}>Sunny</p>
              </Grid>
              <Grid item xs>
                <img src={currentWeatherIcon} className={classes.bigIcon} />
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
                  1000hPa
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs>
                  Humidity:
                </Grid>
                <Grid item xs className={classes.rightTopValues}>
                  100%
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs>
                  Wind:
                </Grid>
                <Grid item xs className={classes.rightTopValues}>
                  10kmph NW
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {tempList.length == 8 && (
            <Grid item container className={classes.weatherBar}>
              {/*<Grid item xs>
                <img src={tempIconsList[0]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[0]}</p>
                <p>00:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[1]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[1]}</p>
                <p>03:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[2]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[2]}</p>
                <p>06:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[3]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[3]}</p>
                <p>09:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[4]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[4]}</p>
                <p>12:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[5]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[5]}</p>
                <p>15:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[6]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[6]}</p>
                <p>18:00</p>
              </Grid>
              <Grid item xs>
                <img src={tempIconsList[7]} className={classes.smallIcon} />
                <p className={classes.specificTemperature}>{tempList[7]}</p>
                <p>21:00</p>
              </Grid>*/}
              {hoursNumber.map(hoursNumberIndex =>
                hoursNumberIndex == buttonIndex ? (
                  <Grid
                    item
                    xs
                    className={classes.checkedHour}
                    key={hoursNumberIndex}
                    onClick={() => handleHourClick(hoursNumberIndex)}
                  >
                    <img
                      src={tempIconsList[hoursNumberIndex]}
                      className={classes.smallIcon}
                    />
                    <p className={classes.specificTemperature}>
                      {tempList[hoursNumberIndex]}
                    </p>
                    <p>21:00</p>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs
                    className={classes.unCheckedHour}
                    key={hoursNumberIndex}
                    onClick={() => handleHourClick(hoursNumberIndex)}
                  >
                    <img
                      src={tempIconsList[hoursNumberIndex]}
                      className={classes.smallIcon}
                    />
                    <p className={classes.specificTemperature}>
                      {tempList[hoursNumberIndex]}
                    </p>
                    <p>21:00</p>
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
            <p className={classes.avgPressureHumidityValue}>{avgPressure}</p>
          </Grid>
          <Grid item xs={2} className={classes.avgPressureHumidity}>
            <p>Humidity:</p>
            <p className={classes.avgPressureHumidityValue}>{avgHumidity}</p>
          </Grid>
          <Grid item xs={3} className={classes.minMaxTemp}>
            <p>Friday</p>
            <p className={classes.dateUnderDay}>06 November</p>
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
}

export default DayWindow;
