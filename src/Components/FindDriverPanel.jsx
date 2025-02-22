import React, { useState } from "react";
import "./FindDriverPanel.css";


const FindDriverPanel = ({ rideData, setOpenModal }) => {

    return (
        <div className="find-driver-panel-content ">
            <h2 className="font-semibold mt-3 px-3 text-xl">
                Finding a Driver<span className="dot-animation"></span>
            </h2>
            <div className="pulse-container">
                <img
                    style={{ mixBlendMode: "darken" }}
                    src={rideData.img}
                    alt={rideData.heading}
                    className="vehicle-img"
                />
                <div className="pulse"></div>
                <div className="pulse pulse2"></div>
            </div>

            <button
                onClick={() => setOpenModal(true)}
                className="cursor-pointer w-full bg-red-500 text-white mb-3 rounded-lg text-center font-bold p-2 py-3"
            >
                Cancel
            </button>            
        </div>
    );
};

export default FindDriverPanel;
