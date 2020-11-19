import axios from "axios";

const apiKey = "f14f6a8afb9f48fa4104b86989623adf";

const database = {
  async getWeatherByCityName(city) {
    const createWeatherList = (
      dateTime,
      temperature,
      icon,
      pressure,
      humidity,
      wind
    ) => ({ dateTime, temperature, icon, pressure, humidity, wind });

    const createCityData = (cityName, countryCode) => ({
      cityName,
      countryCode,
    });

    const weatherList = [];
    var cityData = {};
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: city, appid: apiKey } }
      );

      cityData = {
        cityName: response.data.city.name,
        countryCode: response.data.city.country,
      };
      weatherList.push(
        ...response.data.list.map(listElement =>
          createWeatherList(
            listElement.dt_txt,
            listElement.main.temp,
            listElement.weather[0].main,
            listElement.main.pressure,
            listElement.main.humidity,
            listElement.wind
          )
        )
      );
      //console.log(weatherList);
      return [cityData, weatherList];
    } catch (error) {
      console.log(error);
      return false;
    }
    //const weatherArray = await api.openweathermap.org/data/2.5/forecast?q={Warsaw}&appid={apiKey};
  },
};

export default database;
