import React, { useContext } from 'react'
import Layout from '../Layout/BaseLayout';
import Breadcrumb from '../BaseComponent/BreadCrumbs';
import { ThemeContext } from '../../context/ThemeContext';
import Profile from './Profile/Profile';

function Details() {
  const theame = useContext(ThemeContext);
  return (
    <Layout transparent={theame.theme == "light"}>
      <div className='p-5'>
        <Breadcrumb active='Details' links={[{name: "Home", url: "/"}]}  />
        <div className='w-full  justify-center items-center'>
            <Profile />
            {/* <DataTable collegeListNormalize={colleges} /> */}
        </div>
      </div>
    </ Layout>
  )
}

export default Details