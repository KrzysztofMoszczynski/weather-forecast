import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import MainWeather from "./pages/mainweather";
import About from "./pages/about";
import Statistical from "./pages/stastistical";

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (weatherData) {
      setDataLoaded(true);
    }
  }, [weatherData]);

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path='/mainweather'
            render={props => (
              <MainWeather
                {...props}
                weatherData={weatherData}
                cityData={cityData}
              />
            )}
          />
          <Route exact path='/about' render={() => <About />} />
          <Route exact path='/statistical' render={() => <Statistical />} />
          <Route
            exact
            path='/'
            render={props => (
              <Home
                {...props}
                setWeatherData={setWeatherData}
                setCityData={setCityData}
                dataLoaded={dataLoaded}
                setDataLoaded={setDataLoaded}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
