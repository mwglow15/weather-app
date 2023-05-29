async function getWeather(location) {
  const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c68a6f05871548fc8c405836232904&q=${location}&days=7`, {mode:'cors'})
  const forecastJSON = await forecastResponse.json()

  const weather = await parseForecast(forecastJSON)

  renderDisplay(weather)

  console.log(weather)
}

async function parseForecast(forecastJSON) {
  console.log(forecastJSON)
  let weather = {current: {
                    date: forecastJSON.current.last_updated,
                    condition: forecastJSON.current.condition,
                    feelslikeF: forecastJSON.current.feelslike_f,
                    humidity: forecastJSON.current.humidity,
                    cloud: forecastJSON.current.cloud,
                    precip: forecastJSON.current.precip_in,
                    temp: forecastJSON.current.temp_f,
                    windSpd: forecastJSON.current.wind_mph,
                    windDir: forecastJSON.current.wind_dir
  }, forecast: []
  }

  forecastJSON.forecast.forecastday.forEach((day, i) => {
    weather.forecast[i] = {}

    weather.forecast[i].date = day.date
    weather.forecast[i].condition = day.condition
    weather.forecast[i].feelslikeF = day.feelslike_f
    weather.forecast[i].humidity = day.humidity
    weather.forecast[i].cloud = day.cloud
    weather.forecast[i].precip = day.precip
    weather.forecast[i].temp = day.temp_f
    weather.forecast[i].windSpd = day.wind_mph
    weather.forecast[i].windDir = day.wind_dir
  })

  console.log(weather)

  return weather
}

const formSubmit = document.querySelector('#form-submit')
formSubmit.addEventListener('click', (e) => {
  e.preventDefault()

  const location = document.querySelector('#location')

  getWeather(location.value)
})

getWeather('Philadelphia')

async function renderDisplay(weather) {
  console.log(weather.current)
  setCurrentValues(weather.current)
  weather.forecast.forEach((day) => {
    setForecastValues(day)
  })
}

async function setCurrentValues(weather) {
  setValue('temp', weather.temp)
  setValue('feels-like', weather.feelslikeF)
  setValue('humidity', weather.humidity)
  setValue('wind-spd', weather.windSpd)
  setValue('precip', weather.precip)
  setValue('cloud', weather.cloud)
  setValue('wind-dir', weather.windDir)
}

async function setValue(dataAttribute, dataValue) {
  const span = document.querySelector(`[data-${dataAttribute}]`)

  console.log(span, dataValue)
  span.textContent = dataValue
}

function setForecastValues() {

}