getWeather('Philadelphia')

async function getWeather(location) {
  const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c68a6f05871548fc8c405836232904&q=${location}&days=3`, {mode:'cors'})
  const forecastJSON = await forecastResponse.json()

  const weather = await parseForecast(forecastJSON)

  console.log("JSON", forecastJSON)
  console.log("weather", weather)

  renderDisplay(weather)
}

async function renderDisplay(weather) {
  setCurrentDate(weather.current.date)
  setCurrentValues(weather.current)
  weather.forecast.forEach((day) => {
    setForecastValues(day)
  })
}


async function parseForecast(forecastJSON) {
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
    weather.forecast[i].condition = day.day.condition
    weather.forecast[i].highTempF = day.day.maxtemp_f
    weather.forecast[i].lowTempF = day.day.mintemp_f
    weather.forecast[i].precip = Math.max(day.day.daily_chance_of_rain, day.day.daily_chance_of_snow)
    weather.forecast[i].maxWindSpd = day.day.maxwind_mph
  })

  return weather
}

const formSubmit = document.querySelector('#form-submit')
formSubmit.addEventListener('click', (e) => {
  e.preventDefault()

  const location = document.querySelector('#location')

  getWeather(location.value)
})

async function setCurrentDate(dateJSON) {
  const span = document.querySelector('[data-current-date]')
  const date = await new Date(dateJSON)

  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  span.textContent = formattedDate
}

async function setCurrentValues(weather) {
  setValue('current-icon', weather.condition.icon)
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

  if (dataAttribute.includes('icon')) {
    span.src = dataValue
  } else {
    span.textContent = dataValue
  }
}

async function setForecastValues(forecast) {
  console.log("forecast day", forecast)
  const forecastSection = document.querySelector(".forecast")
  forecastSection.innerHTML = ''
  const date = await new Date(forecast.date)
  let options = {
    weekday: "long",

  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  const icon = await forecast.condition.icon
  const conditionText = await forecast.condition.text
  const hiTemp = await forecast.highTempF
  const lowTemp = await forecast.lowTempF
  const precip = await forecast.precip
  const windSpd = await forecast.maxWindSpd
  const windDir = await forecast.maxWindDir

  const forecastCard = `
  <div class="forecast-card">
    <div class="datum">
      <div class="date">${formattedDate}</div>
    </div>
    <div class="datum"><img src=${icon}></div>
    <div class="datum">${conditionText}</div>
    <div class="datum">
      <div class="datum-title">High Temp</div>
      <div class="datum-value"><span class="value">${hiTemp}</span><span class="unit">F</span></div>
    </div>
    <div class="datum">
      <div class="datum-title">Low Temp</div>
      <div class="datum-value"><span class="value">${lowTemp}</span><span class="unit">F</span></div>
    </div>
    <div class="datum">
      <div class="datum-title">Precip</div>
      <div class="datum-value"><span class="value">${precip}</span><span class="unit">%</span></div>
    </div>
    <div class="datum">
      <div class="datum-title">Wind Spd</div>
      <div class="datum-value"><span class="value">${windSpd}</span><span class="unit">mph</span></div>
    </div>
  </div>`

  forecastSection.innerHTML += forecastCard
}