import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ThemProvider from './context/ThemeContext'
import "./output.css"
import NavigationProvider from './context/NavigationContext'
import CollegeProvider from './context/CollegeContext'
import MapContextProvider from './context/MapContext'
import ModeProvider from './context/RoutingModeContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemProvider>
      <NavigationProvider>
        <CollegeProvider>
          <MapContextProvider>
            <ModeProvider>
              <App />
            </ModeProvider>
          </MapContextProvider>
        </CollegeProvider>
      </NavigationProvider>
    </ThemProvider>
  </React.StrictMode>,
)
