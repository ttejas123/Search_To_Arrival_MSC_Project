import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { ModeContext } from '../../context/RoutingModeContext';

function TravelModeChange() {
    const [travelMode, setTravelMode] = useState(0);
    const theme = useContext(ThemeContext)
    const {changeMode, travelTime} = useContext(ModeContext);
  return (
    <>
        <div className={`flex justify-center items-center absolute z-20 right-1 -top-5 ${theme.theme === "light" ? "bg-[#cccccc]" : "bg-base-200"} rounded-full`}>
            <div className={`rounded-full ${travelMode === 0 && "bg-base-300"}  cursor-pointer transition-all delay-200 p-2.5`} onClick={()=> {
              setTravelMode(0)
              changeMode("WALKING")
            }} ><img src="https://img.icons8.com/material-outlined/31/ffffff/walking--v1.png"/></div>
            <div className={`rounded-full ${travelMode === 1 && "bg-base-300"}  cursor-pointer transition-all delay-200  p-2.5`} onClick={()=> {
              setTravelMode(1)
              changeMode("DRIVING")
            }} ><img src="https://img.icons8.com/ios-glyphs/30/ffffff/car--v1.png"/></div>
            <div className={`rounded-full ${travelMode === 2 && "bg-base-300"}  cursor-pointer transition-all delay-200  p-2.5`} onClick={()=> {
              setTravelMode(2)
              changeMode("BICYCLING")
            }} ><img src="https://img.icons8.com/ios-glyphs/29/ffffff/cycling-road.png"/></div>
            <div className={`rounded-full ${travelMode === 3 && "bg-base-300"}  cursor-pointer transition-all delay-200  p-2.5`} onClick={()=> {
              setTravelMode(3)
              changeMode("TRANSIT")
            }} ><img src="https://img.icons8.com/ios-filled/29/ffffff/train.png"/></div>
        </div>
        {
          travelTime.length > 0  && (<div className={`flex justify-center items-center absolute z-20 right-5 -top-9 ${theme.theme === "light" ? "bg-[#cccccc]" : "bg-base-200"} rounded-full`}>{travelTime}</div>)
        }
    </>
  )
}

export default TravelModeChange