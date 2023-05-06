async function getWeather() {
  const forecastResponse = await fetch('https://api.weatherapi.com/v1/forecast.json?key=c68a6f05871548fc8c405836232904&q=Charlottesville&days=7', {mode:'cors'})
  const forecastJSON = await forecastResponse.json()

  console.log(forecastJSON.current.condition)
  parseForecast(forecastJSON)
}

async function parseForecast(forecastJSON) {
  console.log(forecastJSON)
  let forecast = {current: {}}

  forecast.current.condition = forecastJSON.current.condition
  forecast.current.feelsLikeF = forecastJSON.current.feelslike_f
  forecast.current.humidity = forecastJSON.current.humidity
  forecast.current.precip = forecastJSON.current.precip
  forecast.current.temp = forecastJSON.current.temp_f
  forecast.current.windSpd = forecastJSON.current.wind_mph

  console.log(forecast)
}

getWeather()