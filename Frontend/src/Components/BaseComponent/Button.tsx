import React, { ReactNode, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

interface ButtonProps {
    children: ReactNode;
    outline?: boolean;
    type?: "primary" | "secondary" | "disable" | "warning" | "light" | "dark";
    className?: string;
    onClick?:any
}

function Button({children, outline, type, className, onClick}: ButtonProps) {
  const theme = useContext(ThemeContext)
  const buttontype = ():string => {
    if(type == "primary") return "bg-white text-base border-none  FAQ-highlighter";
    if(type == "secondary") return "text-base"
    if(type == "disable") return "border-none bg-base-100 text-gray-600 hover:text-white hover:MainthemeBackGroundColor text-base"
    if(type == "warning") return `${theme.theme == "dark" ? "MainthemeBackGroundColor hover:bg-black" : "bg-black hover:MainthemeBackGroundColor border-none hover:border"} text-white`
    if(type == "dark") return `bg-[#292929] border-none text-white`
    if(type == "light") return `bg-[#FEFEFE] border-none text-black`

    return "FAQ-highlighter text-base btn-outline"
  } 
  return (
    <button className={`btn font-extrabold normal-case px-6 transition-all hover:scale-90 ${outline && "btn-outline"} ${buttontype()} ${className}`} onClick={onClick}>{children}</button>
  )
}

export default React.memo(Button)