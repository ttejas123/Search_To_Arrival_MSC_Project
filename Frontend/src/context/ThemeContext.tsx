import React, { createContext, ReactNode, useState } from "react";

type ThemeType = "light" | "dark";

type ThemeContextType = {
    theme: ThemeType,
    changeTheme: ()=> void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    changeTheme: ()=> {
        //
    }
});

type Themeprops = {
    children: ReactNode
}

const ThemProvider = (props:Themeprops) => {
    const [theme, setTheme] = useState<ThemeType>("dark");

    const changeTheme = ():void => {
        setTheme((pre)=> {
            return pre == "light" ? "dark" : "light"
        })
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            changeTheme
        }}>{props.children}</ThemeContext.Provider>
    )
}

export default ThemProvider