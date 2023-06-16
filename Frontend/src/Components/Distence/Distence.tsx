import { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/BaseLayout'
import Breadcrumb from '../BaseComponent/BreadCrumbs'
import { ThemeContext } from '../../context/ThemeContext'
import DistanceMap from '../BaseComponent/Map/DistanceMap'
import { MapContext } from '../../context/MapContext'
import AdvanceDataTable from '../Advance/RightPanl/DataTable'
import DataTable from '../BaseComponent/DataTable'

function Distence() {
  const theame = useContext(ThemeContext);
  
  const { changeRediusValue, radius } = useContext(MapContext);
  const [coord, setCoord] = useState({lat: 0, lng: 0});
  const [colleges, setNormalizedColleges] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoord({ lat: latitude, lng: longitude });
    });
  }, []);
  return (
    <Layout transparent={theame.theme == "light"}>
      <div className='p-5'>
        <Breadcrumb active='Distance' links={[{name: "Home", url: "/"}]}  />
        <div className="dropdown">
              <label tabIndex={0} className="border p-2 px-4 rounded-xl border-base-300">Radius ({(radius/1000)}Km)</label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={()=> changeRediusValue(3)}><a>6Km Area</a></li>
                <li onClick={()=> changeRediusValue(5)}><a>10km Area</a></li>
                <li onClick={()=> changeRediusValue(7)}><a>14Km Area</a></li>
                <li onClick={()=> changeRediusValue(10)}><a>20Km Area</a></li>
                <li onClick={()=> changeRediusValue(14)}><a>28Km Area</a></li>
                <li onClick={()=> changeRediusValue(18)}><a>36Km Area</a></li>
                <li onClick={()=> changeRediusValue(20)}><a>40Km Area</a></li>
              </ul>
        </div>
        <div className='w-full  justify-center items-center'>
            <div className='w-full'>
              <DistanceMap coord={coord} colleges={colleges} setNormalizedColleges={setNormalizedColleges} />
            </div>
            <DataTable collegeListNormalize={colleges} />
        </div>
      </div>
    </ Layout>
  )
}

export default Distence