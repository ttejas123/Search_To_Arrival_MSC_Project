import React, { ReactNode, createContext, useState } from 'react'
import { BaseCollegeDataModel } from '../Models/CollegeModel';
import { getData, postData } from '../Utils/fetchData';

interface CompareFor {
    name: string | ""
    first: number | 0,
    second: number | 0
}

interface diffCollege {
    first: BaseCollegeDataModel
    second: BaseCollegeDataModel
    Statsdata: CompareFor[]
    FetchColleges: (idFirst: string, idSecond: string)=> {
        //
    },
    FetchCompareCollegeStates: (idFirst: string, idSecond: string)=> {
        //
    },
}

type CompareProperty = "placements" | "Cordinate" | "Faculty" | "baseCardCourseSchema" | "Facilities" | "courses"

interface CompareDataItems {
    Placement: CompareFor,
    Facilities: CompareFor,
    Faculty: CompareFor,
    courses: CompareFor,
    baseCardCourseSchema: CompareFor
} 

export const CompareContext = createContext<diffCollege>({
    first: {
        _count: {},
        baseCardCourseSchema: [],
        college_city: "",
        college_name: "",
        contact: "",
        Cordinate: [],
        courses: [],
        cover: "",
        Facilities: [],
        Faculty: [],
        id: "",
        logo: "",
        placements: [],
        rating: "",
        state: "",
        url: ""
    },
    second: {
        _count: {},
        baseCardCourseSchema: [],
        college_city: "",
        college_name: "",
        contact: "",
        Cordinate: [],
        courses: [],
        cover: "",
        Facilities: [],
        Faculty: [],
        id: "",
        logo: "",
        placements: [],
        rating: "",
        state: "",
        url: ""
    },
    FetchColleges: async(idFirst: string, idSecond: string)=> {
        //
    },
    FetchCompareCollegeStates: async(idFirst: string, idSecond: string)=> {
        //
    },
    Statsdata: []
})


interface CompareContextProviderProps {
    children: ReactNode;
}
  
function CompareContextProvider({ children }: CompareContextProviderProps) {
    const [FirstSelection, setFirstSelection] = useState<BaseCollegeDataModel>({
        _count: {},
        baseCardCourseSchema: [],
        college_city: "",
        college_name: "",
        contact: "",
        Cordinate: [],
        courses: [],
        cover: "",
        Facilities: [],
        Faculty: [],
        id: "",
        logo: "",
        placements: [],
        rating: "",
        state: "",
        url: ""
    });
    const [SecondSelection, setSecondSelection] = useState<BaseCollegeDataModel>({
        _count: {},
        baseCardCourseSchema: [],
        college_city: "",
        college_name: "",
        contact: "",
        Cordinate: [],
        courses: [],
        cover: "",
        Facilities: [],
        Faculty: [],
        id: "",
        logo: "",
        placements: [],
        rating: "",
        state: "",
        url: ""
    });
    const [Statsdata, setStatesData] = useState<CompareFor[]>([])

    // Two college details 
    const FetchColleges = async(idFirst: string, idSecond: string) => {
        let firstCollegeData:any = {};
        let secondCollegeData:any = {};
        [firstCollegeData, secondCollegeData] = await Promise.all([
            getData("singleCollege", idFirst),
            getData("singleCollege", idSecond)
        ])

        if(firstCollegeData.data.length > 0) {
            const DataofSingleCollege = firstCollegeData.data[0];
            setFirstSelection(DataofSingleCollege);
        }

        if(secondCollegeData.data.length > 0) {
            const DataofSingleCollege = secondCollegeData.data[0];
            setSecondSelection(DataofSingleCollege);
        }
    }

    //fetch States of 2 colleges 
    const FetchCompareCollegeStates = async(idFirst: string, idSecond: string)=> {
        const StatsToCompare:any = await postData("stats", {first: idFirst, second: idSecond});
        setStatesData(StatsToCompare.data)
    }
  
    return (
      <CompareContext.Provider value={{
        first: FirstSelection,
        second: SecondSelection,
        FetchColleges,
        FetchCompareCollegeStates,
        Statsdata
      }}>
        {children}
      </CompareContext.Provider>
    );
  }
  
  export default CompareContextProvider;