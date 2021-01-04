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

    const weatherList = [];
    let cityData = {};
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: city, appid: apiKey } }
      );

      cityData = {
        cityName: response.data.city.name,
        cityId: response.data.city.id,
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
  async getStatisticalData(city, month, day) {
    const statisticalData = {};
    try {
      let cityData;
      let statisticalData;
      const responseID = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: city, appid: apiKey } }
      );
      cityData = {
        id: responseID.data.city.id,
        name: responseID.data.city.name,
        country: responseID.data.city.country,
      };
      const response = await axios.get(
        "https://history.openweathermap.org/data/2.5/aggregated/day",
        { params: { id: cityData.id, month: month, day: day, appid: apiKey } }
      );
      statisticalData = {
        month: month,
        day: day,
        avgPressure: response.data.result.pressure.mean,
        avgHumidity: response.data.result.humidity.mean,
        avgWind: response.data.result.wind.mean,
        avgPrecipitation: response.data.result.precipitation.mean,
        temperature: {
          avg: response.data.result.temp.mean,
          avgMax: response.data.result.temp.average_max,
          avgMin: response.data.result.temp.average_min,
        },
      };
      console.log(statisticalData);
      console.log(cityData);
      return [cityData, statisticalData];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default database;
