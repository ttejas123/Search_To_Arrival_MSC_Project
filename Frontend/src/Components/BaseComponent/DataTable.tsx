import React, { useContext, useState, useEffect } from 'react'
// import { CollegeContext } from '../../../context/CollegeContext'
import { ThemeContext } from '../../context/ThemeContext' 
import { NavigationContext } from '../../context/NavigationContext'

type dataTableProps = {
    collegeListNormalize: any[]
}

function DataTable({collegeListNormalize=[]}) {
    // const {collegeListNormalize} = useContext(CollegeContext)
    const [CollegeData, setCollegeData] = useState(collegeListNormalize);
    const theme = useContext(ThemeContext)
    const {handleChange} = useContext(NavigationContext);
    const keys = [
        "college_name",
        "college_city",
        "state",
        "contact",
        "rating",
        "_count.courses",
        "_count.Faculty",
        "_count.placements",
    ]

    // const handleSort = () => {
    //     const sortByPlacement =  CollegeData.sort((a:any, b:any) => {
    //             return b["_count.placements"] - a["_count.placements"];
    //     })
    //     console.log(sortByPlacement)
    //     setCollegeData(sortByPlacement)
    // }

    useEffect(()=> {
        setCollegeData(collegeListNormalize)
    }, [collegeListNormalize])
  return (
    collegeListNormalize.length > 0 ? (<div className="overflow-x-auto mt-10 shadow-xl h-96 scrollbar-style-ligh scrollbar-style-dark">
        <div className='text-xl mb-4'>College SnapShot ({collegeListNormalize.length})</div>
        <table className="table table-zebra w-full">
            {/* head */}
            <thead>
                <tr>
                        <th>Sr. </th>
                    {
                        keys.map((val, index)=> {
                                return <th key={index}>{val}</th>
                        })    
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        CollegeData.length > 0 && (
                            CollegeData.map((val:any, index)=> {
                                return (<tr key={val.id} className={`${index+1 === 1 && "bg-green-400 text-black"}`}>
                                             <th className={`${index+1 === 1 && "bg-green-400 text-black"}`}>{index+1}</th>
                                            {
                                                keys.map((value:any) => {
                                                    return <td key={value} className={`${index+1 === 1 && "bg-green-400 text-black"}`}>{val[value]}</td>
                                                })
                                            }
                                            <th>
                                                <li onClick={()=> handleChange(3)} className='normal-case list-none' style={{textDecoration: "none"}}>
                                                    <a href={"/details/"+val.id} className='w-full h-full text-white cursor-pointer' style={{textDecoration: "none"}}>Details</a></li>
                                            </th>
                                        </tr>)
        
                                }
                            )
                        )
                    }
            </tbody>
        </table>
        </div>) : <></>
  )
}

export default DataTable