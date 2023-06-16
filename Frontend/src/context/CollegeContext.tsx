import React, {createContext, ReactNode, useEffect, useState} from 'react'
import { getData, postData } from '../Utils/fetchData';

type valueType = string | number | string[]
type baseCourse = {
  "id"?: string,
  "fee"?: string,
  "short_form"?: string,
  "name"?: string
}

export const CollegeContext = createContext({
    placement: [],
    course: [],
    state: [],
    city: [],
    colleges: [],
    collegeListNormalize: [],
    totlePages: 0,
    totleCollegeCount: 0,
    centerA: {lat:0, lng:0},
    chnageCenterOfMap: (val:string):void => {
      //
    },
    ChangeInFiltervalue: (key: string, val: valueType):void => {
      //
    },
    FetchSingleCollegeDetail: (id: string)=> {
      //
    },
    singleCollegeDetail: {
      Cordinate: [{lat: 0, lng: 0}],
      logo: "",
      college_name: "",
      baseCardCourseSchema: [{
        "id": "",
        "fee": "",
        "short_form": "",
        "name": ""
    },{
      "id": "",
      "fee": "",
      "short_form": "",
      "name": ""
  }]
    }
})

interface CollegeProviderProps {
    children: ReactNode
}

interface filterParams {
    numberOfRecord?: number
    pageNumber?: number
    college_name?: string,
    short_head?: string[],
    placement_comapany?: string[],
    state?: string[],
    city?: string[],
    order?: string
}

function getValues(obj:any, headers:any, prefix = "") {
    const values = [];
    for (const key of headers) {
      if (key.startsWith(prefix)) {
        const subKeys = key.slice(prefix.length).split(".");
        let value = obj;
        for (const subKey of subKeys) {
          value = value[subKey];
          if (value === undefined) {
            break;
          }
        }
        values.push(value !== undefined ? value : "");
      } else {
        values.push("");
      }
    }
    return values;
}

const getHeaders = (obj:any, prefix = ""):any => {
    const headers = [];
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        const nestedHeaders = getHeaders(obj[key], prefix + key + ".");
        headers.push(...nestedHeaders);
      } else if(!Array.isArray(obj[key])) {
        headers.push(prefix + key);
      }
    }
    return headers;
  }

function jsonToCsv(jsonData:any) {
    const headers = getHeaders(jsonData[0]);

    const normalizedJSON:any = jsonData.map((item:any, ) => {
      const values = getValues(item, headers);
      let NormalizedCollegeObject = {}
      for(let i = 0; i < values.length; i++){
            NormalizedCollegeObject = {
                [`${headers[i]}`]: values[i],
                ...NormalizedCollegeObject
            }
      }

      return ({
            ...NormalizedCollegeObject
      })
    });

    return (normalizedJSON)
}

function CollegeProvider({children}:CollegeProviderProps) {
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [placement, setPlacement] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filtertedColleges, setFiltertedColleges] = useState([])
    const [collegeListNormalize, setCollegeListNormalize] = useState([])
    const [totlePages, setTotlePage] = useState(0)
    const [totleCollegeCount, setTotleCollegeCount] = useState(0);
    const [center, setCenter] = useState<any>({lat:0, lng:0}) 
    const [singleCollegeDetail, setSingleCollegeDetail] = useState({
      Cordinate: [{lat: 0, lng: 0}],
      college_name: "",
      logo: "",
      baseCardCourseSchema: [{
            "id": "",
            "fee": "",
            "short_form": "",
            "name": ""
        },{
          "id": "",
          "fee": "",
          "short_form": "",
          "name": ""
      }]
      
    })
    const [filterSet, setFilterSet] = useState<filterParams>({
      college_name: "",
      numberOfRecord: 10,
      pageNumber: 1,
      placement_comapany: [],
      short_head: [],
      state: [],
      city: [],
      order: ""
    })

    const chnageCenterOfMap = (latlng:string) => {
      setCenter(JSON.parse(latlng))
    }

    const fetchAllUniqueState = () => {
        getData("state", null).then((res:any)=> {
            setState(res.data.state);
        })
    }

    const fetchAllUniqueCity = () => {
        getData("city", null).then((res:any)=> {
            setCity(res.data.city);
        })
    }

    const fetchAllUniquePlacement = () => {
        getData("placement", null).then((res:any)=> {
            setPlacement(res.data.data)
        })
    }

    const fetchAllUniqueCourse = () => {
        getData("courses", null).then((res:any)=> {
            setCourses(res.data.course)
        })
    }

    const ChangeInFiltervalue = (key: string, val: valueType ) => {
        switch (key) {
          case "pageNumber":
            setFilterSet((pre)=> {
              return {...pre, pageNumber: typeof val === "number" ? val : 1}
            })
            break;
          case "college_name":
            setFilterSet((pre)=> {
              return {...pre, college_name: typeof val === "string" ? val : ""}
            })
            break;
          case "short_head":
            setFilterSet((pre:any) => {
              return {...pre, short_head: val}
            })
            break;
          case "numberOfRecord":
            setFilterSet((pre:any) => {
              return {...pre, numberOfRecord: val}
            })
            break;
          case "placement_comapany":
            setFilterSet((pre:any) => {
              return {...pre, placement_comapany: val}
            })
            break;
          case "state":
            setFilterSet((pre:any) => {
              return {...pre, state: val}
            })
            break;
          case "city":
            setFilterSet((pre:any) => {
              return {...pre, city: val}
            })
            break;
          case "order":
            setFilterSet((pre:any) => {
              return {...pre, order: val}
            })
            break;
          default: 
            break;
        }

    }

    // fetch list of colleges with account of filters and sort accoring to 
    const fetchCollegesAccordingTofilters = () => {
        postData("getAllColleges", {...filterSet}).then((res:any) => {
            setFiltertedColleges(res.data.data)
            const count = res.data._count;
            setTotlePage(()=> {
                const numberOfRecordR =  filterSet.numberOfRecord ? Math.ceil(count / filterSet.numberOfRecord) : Math.ceil(count / 10);
                return numberOfRecordR
            })

            const NormalizedJSONData:any = jsonToCsv(res.data.data)
            setCollegeListNormalize(NormalizedJSONData)
            setTotleCollegeCount(count)
        })
    }

    // single college detail 
    const FetchSingleCollegeDetail = (id: string) => {
        getData("singleCollege", id).then((res:any) => {
          // console.log(res.data[0])
          if(res.data.length > 0) {
            const DataofSingleCollege = res.data[0];
            setSingleCollegeDetail(DataofSingleCollege);
          }
        })
    }

    useEffect(()=> {
        fetchAllUniqueState()
        fetchAllUniqueCity()
        fetchAllUniquePlacement()
        fetchAllUniqueCourse()
    }, [])

    useEffect(()=> {
      fetchCollegesAccordingTofilters()
    }, [filterSet])
  return (
    <CollegeContext.Provider
        value={{
            city: city,
            course: courses,
            placement: placement,
            state: state,
            colleges: filtertedColleges,
            totlePages,
            collegeListNormalize,
            totleCollegeCount,
            ChangeInFiltervalue,
            centerA: center,
            chnageCenterOfMap,
            FetchSingleCollegeDetail,
            singleCollegeDetail
        }}
    >{children}</CollegeContext.Provider>
  )
}

export default CollegeProvider