import { debounce } from 'lodash';
import React, { ReactNode, createContext, useCallback, useRef, useState } from 'react'
import { LatLng } from '../Components/BaseComponent/Map/interface';

interface MapContextType {
    mapRefObj: any
    handleMapContextLoad: (map: google.maps.Map) => void
    radius:number
    changeRediusValue: (radiusInKM:number)=> void
}

export const MapContext = createContext<MapContextType>({
    mapRefObj: google.maps.Map,
    handleMapContextLoad: (map: google.maps.Map) => {
      //
    },
    radius: 3000,
    changeRediusValue: (radiusInKM:number)=> {
      //
    }
})


interface MapContextProviderProps {
    children: ReactNode;
}
  
function MapContextProvider({ children }: MapContextProviderProps) {
    const centerChangedRef = useRef<google.maps.MapsEventListener>();
    const zoomChangedRef = useRef<google.maps.MapsEventListener>();
    const mapRefObj = useRef<google.maps.Map>();
    const [currentCenter, setCurrentCenter] = useState<
      google.maps.LatLng | LatLng
    >({lat:0, lng:0})
    const [radius, setRedius] = useState(3000) //3km

    const handleMapContextLoad = useCallback(
      (map: google.maps.Map) => {
        mapRefObj.current = map
        centerChangedRef.current = mapRefObj.current.addListener(
          "dragend",
          debounce(() => {
            setCurrentCenter(mapRefObj.current?.getCenter() || {lat:0, lng:0})
          }, 200),
        )
  
        zoomChangedRef.current = mapRefObj.current.addListener(
          "zoom_changed",
          debounce(() => {
            setCurrentCenter(mapRefObj.current?.getCenter() || {lat:0, lng:0})
          }, 200),
        )
      },
      [],
    )

    const changeRediusValue = (radiusInKM:number) => {
        setRedius(radiusInKM * 1000);
    }
  
    return (
      <MapContext.Provider value={{
        mapRefObj: mapRefObj,
        handleMapContextLoad,
        radius,
        changeRediusValue
      }}>
        {children}
      </MapContext.Provider>
    );
  }
  
  export default MapContextProvider;