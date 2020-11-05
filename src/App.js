import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/home";
import MainWeather from "./pages/mainweather";


function App() {
  return(
    <Router>
      <div>
        <Switch>
        <Route path="/mainweather">
            <MainWeather/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
