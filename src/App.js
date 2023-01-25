import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {

  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  const apiKey = '3d32270e57e663560cc91ba80b82ab00'

  useEffect(() => {

    console.log('aksldjfakldjflak')

    
    axios({
      method: "GET",
      url:`https://api.openweathermap.org/data/2.5/weather?lat=42.73&lon=84.55&appid=${apiKey}`,}) 
    .then((response) => {
      console.log(response.data);
      setTemp(response.data.main.temp.fahrenheit)
     
    })
    .catch((err) => console.log(err));
    
  },[])


  return (
    <div>
      <h1>Hello</h1>
      {

            <h1>{temp}</h1>
      
      }
    </div>
  );
}

export default App;
