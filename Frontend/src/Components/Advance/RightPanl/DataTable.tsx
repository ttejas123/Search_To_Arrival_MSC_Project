import React, { useContext } from 'react'
import { CollegeContext } from '../../../context/CollegeContext'
import { ThemeContext } from '../../../context/ThemeContext'
import { NavigationContext } from '../../../context/NavigationContext';

function AdvanceDataTable() {
    const {collegeListNormalize} = useContext(CollegeContext)
    const {handleChange} = useContext(NavigationContext);
    const theme = useContext(ThemeContext)
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
  return (
    collegeListNormalize.length > 0 ? (<div className="overflow-x-auto mt-10 shadow-xl h-96 scrollbar-style-ligh scrollbar-style-dark">
        <div className='text-xl mb-4'>College SnapShot</div>
        <table className="table table-zebra w-full">
            {/* head */}
            <thead>
                <tr>
                        <th>Sr. </th>
                    {
                        keys.map((val, index)=> {
                                return <th key={val+index}>{val}</th>
                        })    
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        collegeListNormalize.length > 0 && (
                            collegeListNormalize.map((val:any, index)=> {
                                return (<tr className={`${index+1 === 1 && "bg-green-400 text-black"}`}>
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

export default AdvanceDataTable