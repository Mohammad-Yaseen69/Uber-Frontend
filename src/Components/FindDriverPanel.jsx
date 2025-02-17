import React from 'react';
import './FindDriverPanel.css';

const FindDriverPanel = ({ rideData }) => {
    return (
        <div className="find-driver-panel-content">
            <h2 className='font-semibold mt-3 px-3 text-xl'>Finding a Driver<span className="dot-animation"></span></h2>
            <div className="pulse-container">
                <img style={{mixBlendMode: "darken"}} src={rideData.img} alt={rideData.heading} className="vehicle-img" />
                <div className="pulse"></div>
                <div className="pulse pulse2"></div>
            </div>
        </div>
    );
};

export default FindDriverPanel;
