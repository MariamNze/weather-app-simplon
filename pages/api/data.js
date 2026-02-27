import cityConfig from "../../config/city.json";
import { getWeatherDescription, getWeatherIcon } from "../../mappers/weatherInfo";

export default async function handler(req, res) {
  const { name, country, latitude, longitude } = cityConfig;

  try {
    const getWeatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code,visibility&daily=sunrise,sunset&timezone=auto`
    );
    const data = await getWeatherData.json();

    const currentTime = Math.floor(new Date(data.current.time).getTime() / 1000);
    const sunrise = Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000);
    const sunset = Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000);

    const weatherData = {
    name,
    sys: { country, sunrise, sunset },
    weather: [{
      description: getWeatherDescription(data.current.weather_code),
      icon: getWeatherIcon(data.current.weather_code, currentTime, sunrise, sunset),
    }],
    main: {
      temp: data.current.temperature_2m,
      feels_like: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
    },
    wind: {
      speed: data.current.wind_speed_10m,
      deg: data.current.wind_direction_10m,
    },
    visibility: data.current.visibility,
    dt: currentTime,
    timezone: data.utc_offset_seconds,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
}
