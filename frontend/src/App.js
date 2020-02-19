import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import allActions from './actions'
import { useState } from 'react';
import axios from 'axios';

const renderForecastData = (data) => {
    return (
        data.forecasts.map(function(weather) {
            return <tr>
                <td>{weather.day}</td>
                <td>{weather.low}</td>
                <td>{weather.high}</td>
                <td>{weather.text}</td>
            </tr>
        })
    )
}

const DisplayWeatherReport = (props) => {
    const parsedData = JSON.parse(props);
    if (parsedData) {
        return (
            <div>
                <h4 className="mt-3 mb-3">Today's Report</h4>
                <p>{`City: ${parsedData.location.city}`}</p>
                <p>{`Country: ${parsedData.location.country}`}</p>
                <p>{`Humidity: ${parsedData.current_observation.atmosphere.humidity}`}</p>
                <p>{`Visibility: ${parsedData.current_observation.atmosphere.visibility}`}</p>
                <p>{`Sunrise Time: ${parsedData.current_observation.astronomy.sunrise}`}</p>
                <p>{`SunSet Time: ${parsedData.current_observation.astronomy.sunset}`}</p>
                <p>{`Weather: ${parsedData.current_observation.condition.text}`}</p>
                <p>{`Temperature: ${parsedData.current_observation.condition.temperature}`}</p>
                <h4>Weather Forecast of next 10 days</h4>
                <table className="mt-4 table table-bordered">
                    <thead>
                        <tr>
                            <td>Day</td>
                            <td>Low</td>
                            <td>High</td>
                            <td>Weather</td>
                        </tr>
                    </thead>
                    {renderForecastData(parsedData)}
                </table>
            </div >
        )
    } else {
        return (
            <div></div>
        )
    }
}

const App = () => {
    const currentReport = useSelector(state => state.currentReport.report);
    const dispatch = useDispatch();

    const [city, setCity] = useState('austin');
    const [weatherReport, setWeatherReport] = useState({ report: "" });


    useEffect(() => {
        dispatch(allActions.currentReport.setReport(weatherReport));
    }, [city, setCity, weatherReport, setWeatherReport]);

    function handleCityChange(e) {
        setCity(e.target.value);
    };

    async function getWeatherReport() {
        const dataFetched = await axios.get(`http://localhost:8001/getWeatherOfCity?city=${city}`);
        setWeatherReport({ ...weatherReport, report: (dataFetched.data) });
    }

    return (
        <div className="App">
            <div className="mt-2 container d-flex w-50">
                <select className="form-control" onChange={handleCityChange} value={city}>
                    <option value="austin">Austin</option>
                    <option value="phoenix">Phoenix</option>
                    <option value="madison">Madison</option>
                </select>
                <button className="btn btn-primary" onClick={() => { getWeatherReport() }}>Submit</button>
            </div>
            <div>
                {DisplayWeatherReport(JSON.stringify(weatherReport.report))}
            </div>
        </div>
    );
}

export default App;