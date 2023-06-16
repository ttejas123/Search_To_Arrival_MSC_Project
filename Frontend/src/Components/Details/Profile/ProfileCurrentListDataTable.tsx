import React, { useState } from 'react'
import DataTableComponent from '../../BaseComponent/DataTableComponent';
import Avatar from '../../BaseComponent/Avatar';
import InputGroup from '../../BaseComponent/InputGroup';

const data = [
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    },
    {
        id: 1,
        name: (<Avatar name='Tejas' />),
        wins: "12%",
        volume: "12453B",
        flipHis: "232"
    }
]

interface colType {
    key: string;
    title: string;
    format?: (value: any) => string;
    sortable?: boolean;
}

const col:colType[] = [
    {key: "name", title: "Token"},
    {key: "flipHis", title: "Flip Count"},
    {key: "wins", title: "Wins%"},
    {key: "volume", title: "Volume", sortable: true}
]

const colPlacement:colType[] = [
    {key: "company_name", title: "Company Name"}
]

const colCourse:colType[] = [
    {key: "courses_name", title: "Course Name"},
    {key: "eligibility", title: "Eligibility"},
    {key: "fees_per_year", title: "Fees (per year)"},
    {key: "type", title: "Type"},
    {key: "duration", title: "Duration"},
]

const colFaculty:colType[] = [
    {key: "faculty_name", title: "Faculty Name"},
    {key: "designation", title: "Designation"},
    {key: "qualification", title: "Qualification"},
    {key: "exp", title: "Exp"}
]

const colFacility:colType[] = [
    {key: "facility_name", title: "Facility Name"}
]

interface ProfileCurrentListDataTableProps {
    singleCollegeDetail: any
}

function ProfileCurrentListDataTable({singleCollegeDetail}: ProfileCurrentListDataTableProps) {
    const [selected, setSelected] = useState(0);

    const getDataTableCol = () => {
        switch(selected){
            case 0: 
                return colCourse;
            case 1: 
                return colPlacement;
            case 2: 
                return colFaculty;
            case 3: 
                return colFacility;
            default: 
                return colCourse;
        }
    }

    const getDataTableData = () => {
        switch(selected){
            case 0: 
                return singleCollegeDetail.courses ? singleCollegeDetail.courses : [];
            case 1: 
                return singleCollegeDetail.placements ? singleCollegeDetail.placements : [];
            case 2: 
                return singleCollegeDetail.Faculty ? singleCollegeDetail.Faculty : [];
            case 3: 
                return singleCollegeDetail.Facilities ? singleCollegeDetail.Facilities : [];
            default: 
                return singleCollegeDetail.courses ? singleCollegeDetail.courses : [];
        }
    }

  return (
    <div>
        <div className='md:flex justify-between items-center my-6'>
            <div className='md:flex'>
                <div className='text-subtitle'>Current List</div>
                
            </div>
            {/* <div><InputGroup label  placeholder='Search Token...' /></div> */}
        </div>

        <div className='md:flex justify-start items-center my-4 mt-6 px-4'>
            <div onClick={()=> setSelected(0)}  className='px-2 relative flex justify-center font-bold cursor-pointer transition-all '>Course {selected == 0 && (<div className='absolute -bottom-2 rounded-md h-1 w-full MainthemeBackGroundColor'></div>)}</div>
            <div  onClick={()=> setSelected(1)} className='ml-10 relative flex justify-center font-bold cursor-pointer transition-all  px-2'>Placement {selected == 1 && (<div className='absolute -bottom-2 rounded-md h-1 w-full MainthemeBackGroundColor'></div>)}</div>
            <div  onClick={()=> setSelected(2)} className='ml-10 relative flex justify-center font-bold cursor-pointer transition-all  px-2'>Faculty {selected == 2 && (<div className='absolute -bottom-2 rounded-md h-1 w-full MainthemeBackGroundColor'></div>)}</div>
            <div  onClick={()=> setSelected(3)} className='ml-10 relative flex justify-center font-bold cursor-pointer transition-all  px-2'>Facility {selected == 3 && (<div className='absolute -bottom-2 rounded-md h-1 w-full MainthemeBackGroundColor'></div>)}</div>
        </div>
        <div className='w-full border-t my-6 border-base-300'></div>
        <div className='border-base-300 rounded-2xl border-t'>
            <DataTableComponent columns={getDataTableCol()} data={getDataTableData()} size='xs' CustomHeader={<></>} />
        </div>
    </div>
  )
}

export default ProfileCurrentListDataTable