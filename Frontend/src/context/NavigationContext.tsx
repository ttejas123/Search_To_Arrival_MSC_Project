import { ReactNode, createContext, useEffect, useState } from "react";

export const NavigationContext = createContext({
    nav: 0,
    handleChange: (i: number) => {
        //
    }
});

type NavigationProviderType = {
    children: ReactNode;
} 

const NavigationProvider = ({children}: NavigationProviderType) => {
    const currentPath = window.location.pathname;
    const [nav, setNav] = useState<number>(0);
    const handleChange = (i:number)=> {
        //
    }

    useEffect(()=> {
        if(currentPath === "/") setNav(0)
        else if (currentPath === "/distance") setNav(1)
        else if (currentPath.includes("/details")) setNav(2)
        else if(currentPath === "/compare") setNav(3)
        else window.location.href = "/"
    }, [])   

    return (
        <NavigationContext.Provider
            value={{
                nav: nav,
                handleChange
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

export default NavigationProvider;

