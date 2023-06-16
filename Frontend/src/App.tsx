import { useContext, useEffect, useState } from 'react'
import './App.css'
import Advance from './Components/Advance/Advance'
import Distence from './Components/Distence/Distence';
import { NavigationContext } from './context/NavigationContext';
import { ThemeContext } from './context/ThemeContext';
import Details from './Components/Details/Details';
import "./App.css"
import Compare from './Components/Compare/Compare';
import CompareContextProvider from './context/CompareContext';

function App() {
  const theame = useContext(ThemeContext);
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theame.theme);
  }, [theame.theme]);
  const {nav} = useContext(NavigationContext);
  return (
    <>
      {
        nav === 0 && (<Advance />)
      }

      {
        nav === 1 && (<Distence />)
      }

      {
        nav === 2 && (<Details />)
      }

      {
        nav === 3 && (<CompareContextProvider><Compare /></CompareContextProvider>)
      }
    </>
  )
}

export default App
