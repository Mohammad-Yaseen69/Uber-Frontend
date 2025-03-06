import React, { useEffect, useState } from 'react';
import './FindDriverPanel.css';

const FindDriverPanel = ({ rideData }) => {
    const [dot, setDot] = useState(["."])

    useEffect(() => {
        setTimeout(() => {
            if(dot.length == 3){
                setDot([''])
            }else{
                setDot(dot.push("."))
            }
        } ,300)
    },[dot])

    return (
        <div className="find-driver-panel-content">
            <h2 className='font-semibold mt-3 text-xl'>Finding a Driver{dot}</h2>
            <div className="pulse-container">
                <img src={rideData.img} alt={rideData.heading} className="vehicle-img" />
                <div className="pulse"></div>
                <div className="pulse pulse2"></div>
            </div>
        </div>
    );
};

export default FindDriverPanel;
