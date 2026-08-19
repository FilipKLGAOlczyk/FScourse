import { useState, useEffect } from 'react'
import weatherService from '../services/Weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (capital) {
      weatherService
        .getWeather(capital)
        .then(returnedWeather => {
          setWeather(returnedWeather)
        })
        .catch(error => {
          console.error("Błąd podczas pobierania pogody:", error)
        })
    }
  }, [capital])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather