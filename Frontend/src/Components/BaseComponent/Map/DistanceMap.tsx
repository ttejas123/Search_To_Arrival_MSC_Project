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
  import { MapContext } from "../../../context/MapContext"
import { postData } from "../../../Utils/fetchData"
import { jsonNormalize } from "../../../Utils/NormalizeJSON"
  
  const circleOptions = {
    strokeColor: "#000",
    strokeOpacity: 0.4,
    strokeWeight: 2,
    fillColor: "#000",
    fillOpacity: 0.25,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

  const DistanceMap: FC<MapProps> = ({
    center = DefaultCenter,
    latitudeFieldName = LatitudeFieldName,
    longitudeFieldName = LongitudeFieldName,
    zoom = DefaultZoom,
    markers = DefaultMarkers,
    setNormalizedColleges
  }) => {
    const { radius } = useContext(MapContext);
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [colleges, setColleges] = useState([]);
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
    useEffect(() => {
        const timeout = setTimeout(async()=> {
            postData("getAllColleges", {numberOfRecord: 1000}).then((res:any) => {
                // const count = res.data._count;
                const insideCoords = res.data.data.filter((coord:any) => {
                        const coordFetchfromValue = { lat: parseFloat(coord.Cordinate[0].lat), lng: parseFloat(coord.Cordinate[0].lng) }
                        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                          new window.google.maps.LatLng(coordFetchfromValue),
                          new window.google.maps.LatLng(currentCenter)
                        );
                        return  distance <= radius //coord;
                });
                const NormalizedCollegeObject = (jsonNormalize(insideCoords))
                setNormalizedColleges(NormalizedCollegeObject)
                setColleges(insideCoords)
            })
        }, 1000)
        return ()=> {
          clearTimeout(timeout)
        }
      }, [map?.getCenter()]);

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
                center={currentCenter}
                zoom={currentZoom}
                onLoad={handleLoad}
                onUnmount={handleUnmount}
            > 
                {
                    colleges.length > 0 && colleges.map((val:any, index) => {
                    return (
                        <Marker key={index} onClick={()=> {
                            calculateAndDisplayRoute({lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)})
                            map?.panTo({lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)})
                        }} position={{lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)}} />
                        )
                    })
                }

                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
                <Circle center={map?.getCenter()} options={circleOptions} radius={radius} />
            </GoogleMap>
    )
  }
  
  DistanceMap.displayName = "DistanceMap"
  
  export default DistanceMap