import { CollegeContext } from '../../../context/CollegeContext';
import { ThemeContext } from '../../../context/ThemeContext';
import Card, {TxnNDBest} from '../../BaseComponent/Card';
import ProfileCurrentListDataTable from './ProfileCurrentListDataTable';
import ProfileUserInfoWithWalletButton from './ProfileUserInfoWithWalletButton';
import React, {useEffect, useContext} from "react";

const BestCardData:TxnNDBest = {
  amount: "535",
  down: 45,
  lastMonth: 8,
  name: "Best"
} 

const TransactionData:TxnNDBest = {
  amount: "535",
  down: 45,
  lastMonth: 8,
  name: "Transaction"
} 


export default function Profile() {
  const {FetchSingleCollegeDetail, singleCollegeDetail} = useContext(CollegeContext)
    useEffect(() => {
        const id = (window.location.pathname).replace("/details/", "");
        FetchSingleCollegeDetail(id)
    }, [])
    return (
      <div className="md:flex gap-4 mt-5 justify-center items-start">
        <div className={` w-full md:w-3/12 flex justify-center   flex-wrap  rounded-2xl gap-y-4`} >
                <Card type='TotalAmount' coord={singleCollegeDetail.Cordinate[0] ? singleCollegeDetail.Cordinate[0] : {lat: 0, lng: 0}} />
                <Card type='Balance' className='' />
        </div>
        <div className={` w-full md:w-6/12  rounded-2xl gap-2`}>
              <ProfileUserInfoWithWalletButton logo={singleCollegeDetail.logo} name={singleCollegeDetail.college_name} />
              <div className='flex gap-2'>
                <Card type='TransactionNdBest' txnNbest={{...TransactionData, amount: singleCollegeDetail.baseCardCourseSchema[0]?.fee ? singleCollegeDetail.baseCardCourseSchema[0]?.fee : "0", name: singleCollegeDetail.baseCardCourseSchema[0]?.name ? singleCollegeDetail.baseCardCourseSchema[0]?.name : ""}} />
                <Card type='TransactionNdBest' txnNbest={{...BestCardData, amount: singleCollegeDetail.baseCardCourseSchema[1]?.fee ? singleCollegeDetail.baseCardCourseSchema[1]?.fee : "0", name: singleCollegeDetail.baseCardCourseSchema[1]?.name ? singleCollegeDetail.baseCardCourseSchema[1]?.name : ""}} />
              </div>
              <div className='gap-2 w-full'>
                  <ProfileCurrentListDataTable singleCollegeDetail={singleCollegeDetail} />
              </div>
        </div>
        <div className={` w-full md:w-3/12  rounded-2xl overflow-hidden`} >
        
            <Card type='Activity' />

        </div>
      </div>
    );
  }