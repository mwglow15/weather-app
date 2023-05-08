async function getWeather() {
  const forecastResponse = await fetch('https://api.weatherapi.com/v1/forecast.json?key=c68a6f05871548fc8c405836232904&q=Charlottesville&days=7', {mode:'cors'})
  const forecastJSON = await forecastResponse.json()

  console.log(forecastJSON.current.condition)
  parseForecast(forecastJSON)
}

async function parseForecast(forecastJSON) {
  console.log(forecastJSON)
  let weather = {current: {
                    condition: forecastJSON.current.condition,
                    feeslikeF: forecastJSON.current.feelslike_f,
                    humidity: forecastJSON.current.humidity,
                    precip: forecastJSON.current.precip,
                    temp: forecastJSON.current.temp_f,
                    windSpd: forecastJSON.current.wind_mph
  }, forecast: []
  }

  forecastJSON.forecast.forecastday.forEach((day, i) => {
    weather.forecast[i] = {}

    weather.forecast[i].date = day.date
    weather.forecast[i].condition = day.condition
    weather.forecast[i].feelikeF = day.feelslike_f
    weather.forecast[i].humidity = day.humidity
    weather.forecast[i].precip = day.precip
    weather.forecast[i].temp = day.temp_f
    weather.forecast[i].windSpd = day.wind_mph
  })

  console.log(weather)
}

getWeather()