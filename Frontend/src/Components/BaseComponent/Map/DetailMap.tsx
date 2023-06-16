import {
    Circle,
    GoogleMap,
    Marker,
    DirectionsService,
    useJsApiLoader,
    DirectionsRenderer,
} from "@react-google-maps/api"
import { FC, useContext, useState, useEffect } from "react"
import {
    ContainerStyle,
    DefaultCenter,
    DefaultMarkers,
    DefaultZoom,
    LatitudeFieldName,
    Libraries,
    LongitudeFieldName,
} from "../../BaseComponent/Map/content"
import { MapProps } from "../../BaseComponent/Map/interface"
import { useCenter } from "./useCenter"

const Details: FC<MapProps> = ({
    center = DefaultCenter,
    latitudeFieldName = LatitudeFieldName,
    longitudeFieldName = LongitudeFieldName,
    zoom = DefaultZoom,
    markers = DefaultMarkers,
    coord
  }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const {
      map,
      currentCenter,
      currentZoom,
      handleLoad,
      handleUnmount,
    } = useCenter(center, zoom, latitudeFieldName, longitudeFieldName)
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: Libraries,
    })

    function calculateAndDisplayRoute(destination:any) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin: { "lat": 19.150820, "lng": 72.990336 }, 
            destination: destination,//{ "lat": 19.041121, "lng": 72.861402 },
            travelMode: window.google.maps.TravelMode.DRIVING,
  
        }).then((response:any) => {
            setDirectionsResponse(response);
            // console.log(response.routes[0].legs[0].duration.text)
        }).catch((e) => window.alert("Directions request failed due to " + "status"));
    }
  
    if (!isLoaded) return null

    return (
            <GoogleMap
                mapContainerStyle={ContainerStyle}
                center={{lat: parseFloat(`${coord.lat}`), lng: parseFloat(`${coord.lng}`)}}
                zoom={11}
                onLoad={handleLoad}
                onUnmount={handleUnmount}
                options={{
                    controlSize: 1
                }}
            > 
                <Marker onClick={()=> {
                            calculateAndDisplayRoute({lat: parseFloat(`${coord.lat}`), lng: parseFloat(`${coord.lng}`)})
                            map?.panTo({lat: parseFloat(`${coord.lat}`), lng: parseFloat(`${coord.lng}`)})
                    }} position={{lat: parseFloat(`${coord.lat}`), lng: parseFloat(`${coord.lng}`)}} />

                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
    )
  }
  
  Details.displayName = "Details"
  
  export default Details