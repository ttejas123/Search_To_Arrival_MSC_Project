import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/BaseLayout'
import LeftFilterMenu from './LeftPanal/LeftFilterMenu'
import Breadcrumb from '../BaseComponent/BreadCrumbs'
import { ThemeContext } from '../../context/ThemeContext'
// import CircleBasedMap from './RightPanl/CircleBasedMap'
import MapBox from '../BaseComponent/Map/BaseMap'
import TravelModeChange from '../BaseComponent/TravelModeChange'
import { CollegeContext } from '../../context/CollegeContext'
import AdvanceDataTable from './RightPanl/DataTable'
import Pagination from './RightPanl/pagination'

function Advance() {
  const theame = useContext(ThemeContext);
  const {totlePages} = useContext(CollegeContext);
  const [coord, setCoord] = useState({lat: 0, lng: 0});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoord({ lat: latitude, lng: longitude });
    });
  }, []);
  return (
    <Layout transparent={theame.theme == "light"}>
            <div className='p-5'>
            <Breadcrumb active='Map' links={[{name: "Home", url: "/"}]}  />
            <div className='w-full md:flex justify-center items-start mt-10'>
                <div className='Left-Menu-Filter w-4/12 rounded-lg px-5'><LeftFilterMenu /></div>
                <div className='Main-Map-content w-8/12 rounded-lg px-5 h-full flex-col relative'>
                  <TravelModeChange />
                  <MapBox 
                    coord={coord}
                  />
                  <Pagination pageCount={totlePages} />
            
                  <AdvanceDataTable />
                </div>
            </div>
            </div>
    </ Layout>
  )
}

export default React.memo(Advance)
