import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/id.module.css'

const Details = () => {
    const router = useRouter()
    const id = router.query.id;
    const [data, setData] = useState()

    useEffect(() => {
        if(localStorage.getItem('weatherData')){
            setData(JSON.parse(localStorage.getItem('weatherData')))
        }
    },[])
    
    let weather;
    if(data){
         weather = data.list.find((data) => data.dt == id)
    }
    return (
        <div className={styles.dataContainer}>
            { data && weather ? (
            <> 
                <p className={styles.weatherDate}>{new Date(weather.dt*1000).toLocaleDateString()}</p>
                <div className={styles.dataItemContainer}>

                <div className={styles.dataItem}>
                <h2 className={styles.cityName}>
                    <span>{data.city.name}</span>
                    <sup>{data.city.country}</sup>
                </h2>
                <div className={styles.cityTemp}>
                    {Math.round(weather.temp.day)}<sup>&deg;C</sup>
                </div>
                <div className={styles.info}>
                    <img 
                    className="city-icon" 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description} />
                    <p className={styles.weatherType}>{weather.weather[0].description}</p>
                           
                </div>
               </div>

               <div className={styles.dataItem}>
                   <h4>Feels Like: {Math.round(weather.feels_like.day)}<sup>&deg;C</sup></h4>
                   <h4>Humidity: {weather.humidity}%</h4>
                   <h4>Wind:{weather.speed}ms</h4>
               </div>
           </div>
         </> ) :
            ('loading...')
         }
        </div>
    )
}

export default Details
