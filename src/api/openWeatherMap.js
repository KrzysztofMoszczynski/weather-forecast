import axios from "axios";

const apiKey = "f14f6a8afb9f48fa4104b86989623adf";

const database = {
  async getWeatherByCityName(city) {
    const createWeatherList = (
      dateTime,
      temperature,
      weatherMain,
      weatherDescription,
      pressure,
      humidity,
      windSpeed
    ) => ({
      dateTime,
      temperature,
      weatherMain,
      weatherDescription,
      pressure,
      humidity,
      windSpeed,
    });

    const createCityData = (cityName, countryCode, timezone) => ({
      cityName,
      countryCode,
      timezone,
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
        timezone: response.data.city.timezone,
      };
      console.log(response);
      weatherList.push(
        ...response.data.list.map(listElement =>
          createWeatherList(
            listElement.dt_txt,
            listElement.main.temp,
            listElement.weather[0].main,
            listElement.weather[0].description,
            listElement.main.pressure,
            listElement.main.humidity,
            listElement.wind.speed
          )
        )
      );
      return [cityData, weatherList];
    } catch (error) {
      console.log(error);
      return false;
    }
    //const weatherArray = await api.openweathermap.org/data/2.5/forecast?q={Warsaw}&appid={apiKey};
  },
};

export default database;
