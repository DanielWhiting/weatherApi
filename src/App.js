import { useEffect, useState } from 'react';
import Description from './components/Description';
import sun from './sun.jpg'
import cold from './cold.jpg'
import rain from './rain.jpg'
import clear from './clear.jpg'
import lightning from './lightning.jpg'
import scatteredClouds from './scatteredClouds.jpg'
import cloudy from './cloudy.jpg'
import { getFormattedWeatherData } from './weatherService';


function App() {

  const [city, setCity] = useState("Paris")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('imperial')
  const [bg, setBg] = useState(sun)

  useEffect(() => {
    const fetchWeatherData = async () => {
      
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)
      console.log(data)

      // const threshold = units === "metric" ? 20 : 60;
      // if(data.temp <= threshold){
      //   setBg(cold)
      // } else {
      //   setBg(sun)
      // }

      console.log(data.description)
      console.log(data.description.innerText)

          const sky = data.description;
        if(sky === "clear sky") {
          setBg(clear)
        } else if (sky === "mist") {
          setBg(rain)
        } else if (sky === "rain") {
          setBg(rain)
        } else if (sky === "thunderstorm") {
          setBg(lightning)
        } else if (sky === "few clouds") {
          setBg(scatteredClouds)
        } else if (sky === "broken clouds") {
          setBg(scatteredClouds)
        } else if (sky === "shower rain") {
          setBg(rain)
        } else if (sky === "snow") {
          setBg(cold)
        } else if(sky === "scattered clouds") {
          setBg(scatteredClouds)
        } else if(sky === "overcast clouds") {
          setBg(cloudy)
        } else if(sky === "heavy intensity rain") {
          setBg(rain)
        } else if(sky === "moderate rain") {
          setBg(rain)
        }
    
      
    }

    fetchWeatherData()
      
    }, [units, city])

    const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1);

      const isCelcius = currentUnit === "C"
      button.innerText = isCelcius ? "°F" : "°C"
      setUnits(isCelcius ? "metric" : "imperial")
    }

    const enterKeyPressed = (e) => {
        if(e.keyCode === 13) {
          setCity(e.currentTarget.value)
          e.currentTarget.blur()
        }
    }

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})`}} >
      <div className='overlay'>

      {
        weather && (

        <div className='container'>
          <div className='section section__inputs'>
            <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City' />
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>
          <div className='section section__temperature'>
            <div className='icon'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt='weatherIcon' />
              <h3>{weather.description}</h3>
            </div>
            <div className='temperature'>
              <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
            </div>
          </div>
          {/* description */}
          <Description weather={weather} units={units} />
        </div>
        )
      }

      </div>
    </div>
  );
}

export default App;
