const weatherMap = {
  0: { description: "Clear sky", icon: "01" },
  1: { description: "Mainly clear", icon: "02" },
  2: { description: "Partly cloudy", icon: "02" },
  3: { description: "Overcast", icon: "03" },
  45: { description: "Fog", icon: "50" },
  48: { description: "Depositing rime fog", icon: "50" },
  51: { description: "Light drizzle", icon: "09" },
  53: { description: "Moderate drizzle", icon: "09" },
  55: { description: "Dense drizzle", icon: "09" },
  56: { description: "Light freezing drizzle", icon: "09" },
  57: { description: "Dense freezing drizzle", icon: "09" },
  61: { description: "Slight rain", icon: "10" },
  63: { description: "Moderate rain", icon: "10" },
  65: { description: "Heavy rain", icon: "10" },
  66: { description: "Light freezing rain", icon: "13" },
  67: { description: "Heavy freezing rain", icon: "13" },
  71: { description: "Slight snow fall", icon: "13" },
  73: { description: "Moderate snow fall", icon: "13" },
  75: { description: "Heavy snow fall", icon: "13" },
  77: { description: "Snow grains", icon: "13" },
  80: { description: "Slight rain showers", icon: "09" },
  81: { description: "Moderate rain showers", icon: "09" },
  82: { description: "Violent rain showers", icon: "09" },
  85: { description: "Slight snow showers", icon: "13" },
  86: { description: "Heavy snow showers", icon: "13" },
  95: { description: "Thunderstorm", icon: "11" },
  96: { description: "Thunderstorm with slight hail", icon: "11" },
  99: { description: "Thunderstorm with heavy hail", icon: "11" },
};

export function getWeatherDescription(code) {
  return weatherMap[code]?.description || "Weather description not available";
}

export function getWeatherIcon(code, currentTime, sunrise, sunset) {
  const baseIcon = weatherMap[code]?.icon || "01";
  const isDay = currentTime >= sunrise && currentTime < sunset;
  return `${baseIcon}${isDay ? "d" : "n"}`; 
}