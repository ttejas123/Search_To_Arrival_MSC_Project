import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/BaseLayout'
import Breadcrumb from '../BaseComponent/BreadCrumbs'
import { ThemeContext } from '../../context/ThemeContext';
import Dropdown, { labelandoption } from '../BaseComponent/DropDown';
import { postData } from '../../Utils/fetchData';
import { CompareContext } from '../../context/CompareContext';
import ProfileCurrentListDataTable from '../Details/Profile/ProfileCurrentListDataTable';
import ProfileUserInfoWithWalletButton from '../Details/Profile/ProfileUserInfoWithWalletButton';
import PieChart, { PieChartData } from '../Charts/Paichart';
import DataTableComponent from '../BaseComponent/DataTableComponent';
import { getPercentage } from '../../Utils/MathmaticalCalculatations';

const dataForTable = [
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 23
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    },
    {
        id: 1,
        wins: "12%",
        first: "12453B",
        second: 232
    }
]

interface colType {
    key: string;
    title: string;
    format?: (value: any) => string;
    sortable?: boolean;
}

function Compare() {
    const theame = useContext(ThemeContext);
    const CompareContextData = useContext(CompareContext)
    const [DropDownOne, setDropDownOne] = useState<labelandoption[]>([]);
    const [DropDownTwo, setDropDownTwo] = useState<labelandoption[]>([]);
    const [First, setFirst] = useState<string>("");
    const [Second, setSecond] = useState<string>("");
    const [filterSet, setFilterSet] = useState({
        college_name: "",
        numberOfRecord: 300,
        pageNumber: 1,
        placement_comapany: [],
        short_head: [],
        state: [],
        city: [],
        order: ""
    })

    const col:colType[] = [
        {key: "first", title:CompareContextData.first.college_name},
        {key: "name", title: "Property"},
        {key: "second", title: CompareContextData.second.college_name, sortable: true}
    ]
    
    const getChartDataData: any = (index:number)=> {
        return getPercentage(CompareContextData.Statsdata[index]?.first, CompareContextData.Statsdata[index]?.second)
    }

    const colors = ['#D9DAE1', '#FA4F00'];
    const colors2 = ['#F63B2F', '#00A86B'];

    useEffect(()=> {
        postData("getAllColleges", {...filterSet}).then((res:any) => {
            const DropDownValue = res.data && res.data.data && res.data.data.length > 0 && res.data.data.map((val:any, index:number)=> {
                return {label: val.college_name, value: val.id}
            })
            
            if(DropDownValue.length > 0) {
                setDropDownOne(DropDownValue)
                setDropDownTwo(DropDownValue)
            }
        })
    }, [])

  return (
    <Layout transparent={theame.theme == "light"}>
            <div className='p-5'>
                <Breadcrumb active='Compare' links={[{name: "Home", url: "/"}]}  />
                <div className='w-full md:flex justify-between items-start mt-10 px-20'>
                    <Dropdown setValue={setFirst} option={DropDownOne} />
                    <div className='border-l w-[1px] h-10'></div>
                    <Dropdown setValue={setSecond} option={DropDownTwo} />
                </div>
                <div className='w-full md:flex justify-between items-start mt-10 px-20'>
                    <div className='btn float-right bg-orange-600 text-xl font-md text-white px-10 mt-5 sticky bottom-3 left-4' onClick={()=> {
                        if(First.length > 0 && Second.length > 0) {
                            CompareContextData.FetchColleges(First, Second)
                            CompareContextData.FetchCompareCollegeStates(First, Second)
                        }
                    }}>Fetch</div>
                </div>
                {
                   CompareContextData.first.college_name && CompareContextData.Statsdata.length > 0 && (<>
                        <div className='w-full md:flex justify-between items-start mt-10 px-20'>
                    <div className='md:w-[47%]'>
                        <ProfileUserInfoWithWalletButton logo={CompareContextData.first.logo} name={CompareContextData.first.college_name} />
                    </div>
                    <div className='md:w-[47%]'>
                    <ProfileUserInfoWithWalletButton logo={CompareContextData.second.logo} name={CompareContextData.second.college_name} />
                    </div>
                </div>
                <div className='w-full md:flex justify-center items-start mt-10 px-20 ' style={{height: "400px"}}>
                        <div className='w-8/12'>
                            <DataTableComponent columns={col} data={CompareContextData.Statsdata} size='xs'  />
                        </div>
                </div>
                <hr />
                <div className='w-full md:flex justify-between items-start  px-20'>
                    <PieChart data={getChartDataData(0)} size={240} opacity={0.7} subtitle='Indicate Secure Future' Title='Placement Chance' colors={colors} labelColor='#000' className='mb-12' /> 
                    <PieChart data={getChartDataData(2)} size={240} opacity={0.7} subtitle='Indicate Great Divercity' Title='Courses' colors={colors2} labelColor='#000' /> 
                    <PieChart data={getChartDataData(3)} size={240} opacity={0.7} subtitle='Indicate Best Enviroment' Title='Best Facilities' colors={colors} labelColor='#000' className='mb-12' /> 
                    <PieChart data={getChartDataData(4)} size={240} opacity={0.7} subtitle='Indicate Options' Title='Faculty' colors={colors2} labelColor='#000' /> 

                </div>
                <hr />
                <div className='w-full md:flex justify-between items-start mt-10 px-20'>
                    <div className='gap-2 md:w-[47%] '>
                        <ProfileCurrentListDataTable singleCollegeDetail={CompareContextData.first} />
                    </div>
                    <div className='gap-2 md:w-[47%]'>
                        <ProfileCurrentListDataTable singleCollegeDetail={CompareContextData.second} />
                    </div>
                </div>
                  </>  )
                }
            </div>
    </ Layout>
  )
}

export default Compare