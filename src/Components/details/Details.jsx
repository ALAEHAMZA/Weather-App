import './Details.css';
import React,{useState} from 'react';
import {CiSearch} from "react-icons/ci" ;

export default function Details () {
    const [location,setLocation]=useState('');
    return(
        <div className='details'>
            <div className="search">
                <input 
                    type="text" 
                    placeholder='Another location'
                    value={location}
                    onChange={(e)=>setLocation(e.target.location)}
                />
                <button><div className='logoSearch'><CiSearch/></div></button>
            </div>
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
    );
}