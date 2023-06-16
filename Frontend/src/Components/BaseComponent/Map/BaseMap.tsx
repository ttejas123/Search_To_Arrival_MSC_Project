import {
    Circle,
    DirectionsRenderer,
    GoogleMap,
    Marker,
    MarkerClusterer,
    useJsApiLoader,
    InfoWindow
  } from "@react-google-maps/api"
  import { FC, useEffect, useContext, useState } from "react"
  import { SearchInput } from "../../BaseComponent/Map/SearchInput"
  import {
    ContainerStyle,
    DefaultCenter,
    DefaultMarkers,
    DefaultZoom,
    LatitudeFieldName,
    Libraries,
    LongitudeFieldName,
  } from "../../BaseComponent/Map/content"
  import { LatLng, MapProps } from "../../BaseComponent/Map/interface"
  import { useCenter } from "./useCenter"
  import { useMark } from "../../BaseComponent/Map/useMark"
  import { CollegeContext } from "../../../context/CollegeContext"
import { MapContext } from "../../../context/MapContext"
import { ModeContext } from "../../../context/RoutingModeContext"
import { NavigationContext } from "../../../context/NavigationContext"
  
  const MapBox: FC<MapProps> = ({
    center = DefaultCenter,
    latitudeFieldName = LatitudeFieldName,
    longitudeFieldName = LongitudeFieldName,
    zoom = DefaultZoom,
    markers = DefaultMarkers,
    // enableAddMark = true,
    enableSearch = true,
    // enableClustering = false,
    onMarkerSelected,
    onMarkerCreated,
    onMarkersChanged,
  }) => {
    const { colleges, centerA, chnageCenterOfMap } = useContext(CollegeContext)
    const {mode, changeTravelTime} = useContext(ModeContext);
    const [directionsResponse, setDirectionsResponse] = useState<any>(null)
    const [infoWindowData, setInfoWindowData] = useState({lat:0 , lng: 0})
    const [selectedCollege, setSelectedCollege] = useState<any>(null);
    const {handleChange} = useContext(NavigationContext);
    useEffect(()=> {
      if(selectedCollege && selectedCollege.Cordinate[0].lat && selectedCollege.Cordinate[0].lng && mode) calculateAndDisplayRoute({lat: parseFloat(selectedCollege.Cordinate[0].lat), lng: parseFloat(selectedCollege.Cordinate[0].lng)}) 
    }, [mode])
    const { currentMarks, addMark } = useMark(
      markers,
      latitudeFieldName,
      longitudeFieldName,
    )
    const {
      map,
      currentCenter,
      currentZoom,
      handleLoad,
      handleUnmount,
      setCurrentZoom,
    } = useCenter(center, zoom, latitudeFieldName, longitudeFieldName)
    // const mapClick = (e: google.maps.MapMouseEvent) => {
      // if (!enableAddMark) return
      // const { latLng } = e
      // const lat = latLng?.lat(),
      //   lng = latLng?.lng()
      // if (lat !== undefined && lng !== undefined) {
      //   addMark(lat, lng)
      //   onMarkerCreated && onMarkerCreated({ lat, lng })
      // }
    // }
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: Libraries,
    })
  
    // const handlePlaceChanged = (location: google.maps.LatLngLiteral) => {
    //   map?.panTo(location)
    //   setCurrentZoom(13)
    // }
  
    // useEffect(() => {
    //   onMarkersChanged && onMarkersChanged(currentMarks)
    // }, [currentMarks, onMarkersChanged])

    // useEffect(() => {
    //   onMarkersChanged && onMarkersChanged(currentMarks)
    // }, [currentMarks, onMarkersChanged])
  
    if (!isLoaded) return null
  
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
      radius: 5000 // 3 km
    };

    function calculateAndDisplayRoute(destination:any) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route({
            origin: { "lat": 19.150820, "lng": 72.990336 },
            destination: destination,//{ "lat": 19.041121, "lng": 72.861402 },
            travelMode: window.google.maps.TravelMode[mode],

        }).then((response:any) => {
            setDirectionsResponse(response);
            changeTravelTime(response.routes[0].legs[0].duration.text)
        }).catch((e) => window.alert("Directions request failed due to " + "status"));
    }

    return (
      <GoogleMap
        mapContainerStyle={ContainerStyle}
        center={currentCenter}
        zoom={currentZoom}
        // onClick={mapClick}
        onLoad={handleLoad}
        onUnmount={handleUnmount}
        mapContainerClassName="relative"
      >
       {/* <SearchInput onPlaceChanged={handlePlaceChanged} /> */}
        {/* {enableClustering && (
          <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {(clusterer) => (
              <div>
                {currentMarks &&
                  currentMarks.map(
                    ({ lat, lng }: LatLng, i: number) =>
                      lat !== undefined &&
                      lng !== undefined && (
                        <Marker
                          key={`${i}${lat}${lng}`}
                          position={{ lat, lng }}
                          clusterer={clusterer}
                          onClick={() => {
                            onMarkerSelected && onMarkerSelected({ lat, lng })
                          }}
                        />
                      ),
                  )}
              </div>
            )}
          </MarkerClusterer>
        )}
        {!enableClustering &&
          currentMarks &&
          currentMarks.map(
            ({ lat, lng }: LatLng, i: number) =>
              lat !== undefined &&
              lng !== undefined && (
                <Marker
                  key={`${i}${lat}${lng}`}
                  position={{ lat, lng }}
                  onClick={() => {
                    onMarkerSelected && onMarkerSelected({ lat, lng })
                  }}
                />
              ),
          )} */}
        
          {
            colleges.length > 0 && colleges.map((val:any, index) => {
              const flag = selectedCollege && selectedCollege.Cordinate[0].lat === val.Cordinate[0].lat && selectedCollege.Cordinate[0].lng === val.Cordinate[0].lng
              return (
                  <>
                  {
                    !flag ? (
                      <Marker key={index} label={`${val.college_name}`} title={val.college_name} icon="https://img.icons8.com/offices/30/marker.png"  onClick={()=> {
                    setSelectedCollege(val);
                    // calculateAndDisplayRoute({lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)})
                    // setInfoWindowData({lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)});
                    map?.panTo({lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)})
                  }} position={{lat: parseFloat(val.Cordinate[0].lat), lng: parseFloat(val.Cordinate[0].lng)}} />
                    ) : (<></>)
                  }
                  </>
                )
            })
          }

          {/* {
            infoWindowData && infoWindowData.lat !== 0 && infoWindowData.lng !== 0 && (
              <InfoWindow
                position={infoWindowData}
                onCloseClick={()=> {
                  setInfoWindowData({lat: 0, lng: 0})
                  setDirectionsResponse(null)
                  changeTravelTime("")
                }}
              >
                <div>
                  <h1>InfoWindow</h1>
                </div>
              </InfoWindow>
            )
          } */}


          {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
          )}

          {
             selectedCollege && (
              <Marker label={`${selectedCollege.college_name}`} title={selectedCollege.college_name}  onClick={()=> {
                    map?.panTo({lat: parseFloat(selectedCollege.Cordinate[0].lat), lng: parseFloat(selectedCollege.Cordinate[0].lng)})
                  }} position={{lat: parseFloat(selectedCollege.Cordinate[0].lat), lng: parseFloat(selectedCollege.Cordinate[0].lng)}} />
            )
          }
          {
             selectedCollege && (
              <div className="absolute bg-white h-full w-1/3 slide-right">
                  <div className="bg-white w-5 h-12 flex justify-center items-center rounded-r-xl float-right -mr-5  mt-[90%] cursor-pointer" onClick={()=> {
                    setSelectedCollege(null)
                    setDirectionsResponse(null)
                    changeTravelTime("")
                  }}>x</div>
                  <div className="coverpic w-full ">
                   
                    <img src={`${import.meta.env.VITE_REACT_APP_STATIC_URL}${selectedCollege.cover}`} className="w-full h-52" />
                    <div className="my-4 ml-4 text-black text-base flex justify-between items-center">
                      <div className="flex-1">{selectedCollege.college_name} </div> 
                      <div className="flex-1 flex justify-end mr-4">
                        <div className="w-8 rounded-sm bg-orange-600 p-1.5" onClick={()=> {
                          calculateAndDisplayRoute({lat: parseFloat(selectedCollege.Cordinate[0].lat), lng: parseFloat(selectedCollege.Cordinate[0].lng)})
                        }}>
                          <img src="https://img.icons8.com/material-rounded/22/ffffff/near-me.png"/>
                        </div>
                        <a className="w-8 rounded-sm bg-gray-300 p-1.5 ml-2" href={"/details/"+selectedCollege.id} onClick={()=> {
                          handleChange(3)    
                        }}>
                        
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVR4nO2VwQkAIQwEpzz7LyFXyN5HQVA5JCrCZUAQIjuPkAjBBAl4ADmP5awGWxCuStJQil40yjkqUOeuj7e6SuBBVwgUPSB6wC/nwHav67RIYqMPJ6DHC6Jsv3ofzjEAAAAAAElFTkSuQmCC" />
                        </a>
                      </div>
                    </div>
                    
                    <hr />
                    <div className="RouteSteps overflow-y-scroll h-56 scrollbar-style-light">
                        {directionsResponse && directionsResponse.routes[0].legs[0].steps && directionsResponse.routes[0].legs[0].steps.length > 0 && (
                          <div className=" text-black text-[14px] font-[20px] flex mt-2 ml-2">{mode} Mode </div>
                        )}

                        {
                          directionsResponse && directionsResponse.routes[0].legs[0].steps && directionsResponse.routes[0].legs[0].steps.length > 0 && (
                            directionsResponse.routes[0].legs[0].steps.map((val:any, index:number) => {
                              
                              return (
                                <div className="flex justify-between w-full text-[11px] text-black my-2">
                                    <div className="flex w-full">
                                      <div>
                                        {
                                          val.maneuver === "turn-right" && (<img width="22" height="22" src="https://img.icons8.com/material-sharp/24/right--v1.png" alt="right--v1"/>)
                                        }

                                        {
                                          val.maneuver === "turn-left" && (<img width="22" height="22" src="https://img.icons8.com/material-sharp/24/left.png" alt="left"/>)
                                        }

                                        {
                                          val.maneuver == "" || val.maneuver === "straight" && (<img width="22" height="22" src="https://img.icons8.com/material-sharp/24/long-arrow-up.png" alt="long-arrow-up"/>)
                                        }

                                        {
                                          val.maneuver.length === 0 && (<img width="22" height="22" src="https://img.icons8.com/windows/32/centre-of-gravity.png" alt="centre-of-gravity"/>)
                                        }
                                      </div> 
                                     
                                    </div>
                                    <div className="w-[70%] flex justify-end items-center">{val.distance.text}- <div>({val.duration.text})</div></div>
                                </div>
                              )
                            })
                          ) 
                        }
                    </div>
                  </div>
              </div>
             )
          }
          {/* <Circle center={{lat: 19.144, lng: 72.91}} options={circleOptions} /> */}
      </GoogleMap>
    )
  }
  
  MapBox.displayName = "MapBox"
  
  export default MapBox