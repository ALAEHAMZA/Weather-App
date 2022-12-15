import './Weather.css';
import axios from "axios";
import React,{useState,useEffect} from 'react';
import {BsSun} from 'react-icons/bs';
import {BsCloudy} from 'react-icons/bs';
import {BsCloudRainHeavy} from "react-icons/bs"
import {BsCloudSnow} from "react-icons/bs";
import {CiSearch} from "react-icons/ci" ;
import {IoThunderstormOutline} from "react-icons/io5";
import {BsCloudHaze1} from "react-icons/bs";

export default function Weather() {
    const [infos,setInfos]=useState([]);
    const [location,setLocation]=useState('tetouan');
    const [input,setInput]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLocation(input);
    };


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d1195038077f099ac192273d37c20b77`);
            return res.data;
        };
    
        getData().then((infos) => setInfos(infos));
        }, [location]);

    console.log(infos);

    
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default",{month:'long'});
    let day = d.toLocaleString("default",{weekday:'long'});
    let time =d.toLocaleString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

    let icon = null;
    let background =null;
    if (typeof infos.main != "undefined") {
        switch (infos.weather[0].main) {
            case "Clouds":
                icon = <BsCloudy/>
                background = "clouds"
                break;
            case "Clear":
                icon = <BsSun/> 
                background = "clair"
                break; 
            case "Drizzle":
                icon = <BsCloudRainHeavy/> 
                background = "rain"
                break;            
            case "Rain":
                icon = <BsCloudRainHeavy/> 
                background = "rain"
                break;
            case "Haze":
                icon = <BsCloudHaze1/>
                background = "haze" 
                break;
            case "Thunderstorm":
                icon = <IoThunderstormOutline/> 
                background = "haze"
                break;
            case "Snow":
                icon = <BsCloudSnow/>
                background = "snow"
                break;
            default:
                icon = <BsCloudy/>
                background = "clouds"
                break;
        }
    }else{
        return "LOADING..."
    }

    return(
        <div className={background}>
            {infos.main !== undefined ? (
                <>
            <div className='left'>
                <h2 className='title'>the.weather</h2>
                <div className="container">
                    <div className="temp">{Math.floor(infos.main.temp-273.15)}º</div>
                    <div className="placeDate">
                        <div className="place">{infos.name}</div>
                        <div className="date">{time} - {day}, {date} {month}, {year}</div>
                    </div>
                    <div className="mainLogo">
                        <div className="logo">{icon}</div>
                        <div className="main">{infos.weather[0].main}</div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className="search" >
                    <input 
                        type="text" 
                        placeholder='Another location'
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        required
                    />
                    <button className='buttonSearch' onClick={handleSubmit}><div><CiSearch/></div></button>
                </div>
                <div className="cities">
                    <div className="city"><button onClick={() => setLocation("rabat")}>Rabat</button></div>
                    <div className="city"><button onClick={() => setLocation("paris")}>Paris</button></div>
                    <div className="city"><button onClick={() => setLocation("madrid")}>Madrid</button></div>
                    <div className="city"><button onClick={() => setLocation("amsterdam")}>Amsterdam</button></div>
                </div>
                <div className="infos">
                    <h2>Weather Details</h2>
                    <div >
                        <div className="info">
                            <span>Cloudy    :</span>
                            <span>{infos.clouds.all}%</span>
                        </div>
                        <div className="info">
                            <span>Humidity  :</span>
                            <span>{infos.main.humidity}%</span>
                        </div>
                        <div className="info">
                            <span>Wind  :</span>
                            <span>{infos.wind.speed}Km/H</span>
                        </div>
                        <div className="info"   >
                            <span>Pressure  :</span>
                            <span>{infos.main.pressure}Pa</span>
                        </div>
                    </div>
                </div>
            </div>
            </>
            ):('LOADING...')
    
}
        </div>
    )
};
