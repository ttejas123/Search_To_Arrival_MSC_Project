import React, { useContext, useEffect } from "react";
// import Footer from "./Footer";
// import NavBar from "./NavBar";
import Footer from "../BaseComponent/Footer";
import NavBar from "../BaseComponent/NavBar";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  children: JSX.Element;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  transparent?: boolean;
  noBorder?: boolean; 
};

export default function Layout({ children, className, fullWidth, id, transparent, noBorder }: Props) {
  const theame = useContext(ThemeContext);
  return (
    
    <main className={`flex min-h-screen w-screen flex-col items-center justify-start ${!transparent && "bg-lightBg2"} `}>
      <NavBar />
      <div className="flex w-full flex-col justify-between md:px-24 md:py-16 rounded-3xl">
        <div className="pb-16">
          <div id={id}
            className={`${className} ${
              fullWidth ? 'w-full' : 'max-w-screen-2xl'
            } mx-auto ${theame.theme == "light" ? `border-base-300  ${!noBorder && "md:border-2"}`: ""} ${transparent ? "bg-base-100" : "bg-base-200"}  rounded-2xl`}>
            
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </main>
    
  );
}