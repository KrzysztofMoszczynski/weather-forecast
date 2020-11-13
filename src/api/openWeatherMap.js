import axios from "axios";

const apiKey = "f14f6a8afb9f48fa4104b86989623adf";

const database = {
  async getWeatherByCityName(city) {
    const createWeatherList = (
      date,
      hour,
      temperature,
      icon,
      pressure,
      humidity,
      wind
    ) => ({ date, hour, temperature, icon, pressure, humidity, wind });

    const weatherList = [];
    /*var url =
      "api.openweathermap.org/data/2.5/forecast?q={" +
      city +
      "}&appid={" +
      apiKey +
      "}";
    const response = await axios.get(url);*/
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: city, appid: apiKey } }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    //const weatherArray = await api.openweathermap.org/data/2.5/forecast?q={Warsaw}&appid={apiKey};
  },
};

export default database;
