import React, { createContext, ReactNode, useState } from "react";

type ModeType = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

type ThemeContextType = {
    mode: ModeType,
    travelTime: string,
    changeMode: (mode:ModeType)=> void
    changeTravelTime: (time:string)=> void
}

export const ModeContext = createContext<ThemeContextType>({
    mode: "WALKING",
    travelTime: "0 mim",
    changeMode: ()=> {
        //
    },
    changeTravelTime: ()=> {
        //
    }
});

type Themeprops = {
    children: ReactNode
}

const ModeProvider = (props:Themeprops) => {
    const [mode, setMode] = useState<ModeType>("WALKING");
    const [travel, setTravel] = useState<string>("");

    const changeMode = (mode:ModeType):void => {
        setMode((pre)=> {
            return mode
        })
    }

    const changeTravelTime = (time: string) => {
        setTravel((pre) => {
            return time
        })
    }

    return (
        <ModeContext.Provider value={{
            mode,
            travelTime: travel,
            changeMode,
            changeTravelTime
        }}>{props.children}</ModeContext.Provider>
    )
}

export default ModeProvider