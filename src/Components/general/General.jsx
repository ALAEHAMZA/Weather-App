import './General.css';
import axios from "axios";
import React,{useState,useEffect} from 'react';
import {BsSun} from 'react-icons/bs';
import {BsCloudy} from 'react-icons/bs';
import {BsCloudRainHeavy} from "react-icons/bs"
import {CiSearch} from "react-icons/ci" ;

export default function General() {
    const [infos,setInfos]=useState([]);
    const [location,setLocation]=useState('Tetouan');
    const [input,setInput]=useState('');

    const handleSubmit=(e)=>{
        e.preventdefault();
        setLocation(input);
    };

    useEffect(()=>{
        const getData=async() =>{
            const res =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d1195038077f099ac192273d37c20b77`);
            return res.data
        };

        getData().then((infos)=>setInfos(infos));
    },[]);

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default",{month:'long'});
    let day = d.toLocaleString("default",{weekday:'long'});
    let time =d.toLocaleString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

    return(
        <div className="general">
            <div className='left'>
                <h2 className='title'>the.weather</h2>
                <div className="container">
                    <div className="temp">{infos.main.temp}</div>
                    <div className="placeDate">
                        <div className="place">{infos.name}</div>
                        <div className="date">{time} - {day},{month},{date},{year}</div>
                    </div>
                    <div className="mainLogo">
                        <div className="logo"><BsSun/></div>
                        <div className="main">{infos.weather}</div>
                    </div>
                </div>
            </div>

            <div className='right'>
                <form className="search" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Another location'
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        required
                    />
                    <button type='submit'><div><CiSearch/></div></button>
                </form>
                <div className="infos">
                    <h2>Weather Details</h2>
                    <div >
                        <div className="info">
                            <span>Cloudy    :</span>
                            <span>12%</span>
                        </div>
                        <div className="info">
                            <span>Humidity  :</span>
                            <span>78%</span>
                        </div>
                        <div className="info">
                            <span>Wind  :</span>
                            <span>1Km/H</span>
                        </div>
                        <div className="info"   >
                            <span>Rain  :</span>
                            <span>0mm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


