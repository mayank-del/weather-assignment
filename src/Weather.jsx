import { useState } from "react";
import "./App.css";
import axios from "axios";

function Weather() {
  const[toggled,setToggled]=useState(true)
  //console.log(process.env.REACT_APP_APIKEY);
  const ApiKey=process.env.REACT_APP_APIKEY
  const unit = "metric";
  const [weather, setWeather] = useState({});
  const [hourly, setHourly] = useState("");
  const [cityName, setCityName] = useState("");

  const [timedata, setTimedata] = useState(new Date().toLocaleTimeString());

  const interval1 = () => {
    setTimedata(new Date().toLocaleTimeString());
  };
  setInterval(interval1, 1000);

  // Log updated timedata within the component render
  //console.log(timedata);

  async function callApi() {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&units=${unit}`
      )
      .then((res) => {
        //console.log(res);
        setWeather(res.data);
        setHourly("data set");
      });
    /* await axios.get(`
    https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${query}&appid=${apiKey}
    `)
    .then((res) => {
      console.log(res);
      setHourly(res.data);
    }); */
  }
  return (
    <div className="App">
    <div  onClick={()=>{setToggled(!toggled)
              document.body.className=`${toggled?"body-light":""}`          
                                
            }} className={`theme-toggle${toggled?" night":""}`}>
              <div className="sun-image">
                  <div className="crator"></div>
                  <div className="crator"></div>
              </div>
              <div className={`${toggled?"night":""}`}>
                <div className="shape sm"></div>
                <div className="shape sm"></div>
                <div className="shape md"></div>
                <div className="shape lg"></div>
              </div>
       
            </div>
      <div className="center-div">
        <div className="top-div">
          <h1 className={`top-heading${toggled?" night":""}`}>Weather Application</h1>
        </div>
    <div className={`input-div${toggled?" night":""}`}>
        <input
          type="text"
          className={`city-input${toggled?" night":""}`}
          name="temp"
          placeholder="Search weather by city"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button onClick={callApi} className={`search-button${toggled?" night":""}`}>
          Search
        </button>
        </div>
        {hourly && <p>Showing weather for the City : {weather.name}</p>}
        {hourly && (
          <div className={`main-div${toggled?" night":""}`}>
            <div className={`first${toggled?" night":""}`}>
              <div className="headers">
                <h3>Current Weather</h3>
              </div>
              <div className="data">
                <p>Current Temperature : {weather?.main?.temp}° C</p>
                <p>Maximum Temperatur : {weather?.main?.temp_max}° C</p>
                <p>Minnimum Temperatur : {weather?.main?.temp_min}° C</p>
                <p>Description : {weather?.weather?.[0]?.description}</p>
              </div>
            </div>
            <div className={`second${toggled?" night":""}`}>
              <div className="headers">
                <h3>Air Condition</h3>
              </div>
              <div className="data">
                <p>Speed : {weather?.wind?.speed} m/s</p>
                <p>Gust : {weather?.wind?.gust} </p>
                <p>Humidity : {weather?.main?.humidity}%</p>
                <p>Cloud : {weather?.clouds?.all}%</p>
              </div>
            </div>
          </div>
        )}
        <div className={`bottom-div${toggled?" night":""}`}>
          <h2>Digital Clock</h2>
          {timedata}
        </div>
      </div>
    </div>
  )
}

export default Weather