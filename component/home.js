import styles from './home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

const URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?';
const API_KEY = '25768d15dab82020ddda39eac84e28ee';

const home = () => {
    const router = useRouter()

    const [weatherData, setWeatherData] = useState();
    const [city, setCity] = useState('')
   
    const getData = async (query='dhaka') => {
        try {
            const { data }  = await axios.get(URL, {
                params: {
                    q: query,
                    units: 'metric',
                    APPID: API_KEY,
                }
            });
            setWeatherData(data)
            setCity('')
            localStorage.setItem('weatherData', JSON.stringify(data))
        }

        catch(error){
            alert('Please input correct City or Country name')
        }
    }
    
    useEffect(() => {
        getData()
    },[])

    const search = async(e)=> {
        if(e.key === 'Enter'){
            getData(city)
        }
    }

    const clickHandler = (date) => {
        router.push({
          pathname: '/[id]',
          query: { id: date },
        })
    }

    return (
        <div className={styles.mainContainer}>
        <input 
            type="text" 
            className={styles.search} 
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            onKeyPress={search}
            placeholder="Enter your city name..."/>
        <div className={styles.cardContainer}>
            {weatherData&&weatherData.list.map((data) => {
                return(
                    <div 
                        key ={data.dt} 
                        className={styles.city} 
                        onClick={(e) => {clickHandler(data.dt)}}>

                        <h2 className={styles.cityName}>
                            <span>{weatherData.city.name}</span>
                            <sup>{weatherData.city.country}</sup>
                        </h2>
                        <div className={styles.cityTemp}>
                            {Math.round(data.temp.day)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className={styles.info}>
                            <img 
                                className="city-icon" 
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                                alt={data.weather[0].description} />
                            <p className={styles.weatherType}>{data.weather[0].description}</p>
                            <p className={styles.weatherDate}>{new Date(data.dt*1000).toLocaleDateString()}</p>
                        </div>
                    </div>
            )})
            }
            </div>   
        </div>
    )
}

export default home
