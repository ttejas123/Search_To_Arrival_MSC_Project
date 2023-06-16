import React, { useContext, useState } from 'react'
import { CollegeContext } from '../../../context/CollegeContext'

function LeftFilterMenu() {
  const {city, course, placement, state, totleCollegeCount, ChangeInFiltervalue} = useContext(CollegeContext)
  const [cityState, setCityState] = useState<Set<string>>(new Set());
  const [stateState, setStateState] = useState<Set<string>>(new Set());
  const [placementState, setPlacementState] = useState<Set<string>>(new Set());
  const [courseState, setCourseState] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState("");

  const cityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
  
    setCityState((prevCityState) => {
      const newCityState = new Set(prevCityState);
  
      if (newCityState.has(checkboxId)) {
        newCityState.delete(checkboxId);
      } else {
        newCityState.add(checkboxId);
      }
  
      return newCityState;
    });
  };

  const stateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
  
    setStateState((prevCityState) => {
      const newCityState = new Set(prevCityState);
  
      if (newCityState.has(checkboxId)) {
        newCityState.delete(checkboxId);
      } else {
        newCityState.add(checkboxId);
      }
  
      return newCityState;
    });
  };

  const placementHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
  
    setPlacementState((prevCityState) => {
      const newCityState = new Set(prevCityState);
  
      if (newCityState.has(checkboxId)) {
        newCityState.delete(checkboxId);
      } else {
        newCityState.add(checkboxId);
      }
  
      return newCityState;
    });
  };

  const courseHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
  
    setCourseState((prevCityState) => {
      const newCityState = new Set(prevCityState);
  
      if (newCityState.has(checkboxId)) {
        newCityState.delete(checkboxId);
      } else {
        newCityState.add(checkboxId);
      }
  
      return newCityState;
    });
  };
  return (
    <div className='flex-1'>
        <div>
          <div className='font-extrabold text-3xl'>Filter</div>
          <div className='flex justify-between items-start'>
            <div className='text-gray-500'>{totleCollegeCount} Colleges Found</div>
            <div className="dropdown">
              <label tabIndex={0} className="border p-2 px-4 rounded-xl border-base-300">Sort by</label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={()=> setOrder("college_name")}><a>Alphabetical</a></li>
                <li onClick={()=> setOrder("rating")}><a>Ranking</a></li>
                <li onClick={()=> setOrder("")}><a>Default</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='w-full h-0.5 border-b p-2' ></div>

        <br />

        <div className='p-2 rounded-lg'>
          <div className='text-xl font-extrabold'>
              Course ( {courseState.size} )
          </div>
          <br />
          <div className='max-h-40 overflow-y-scroll scrollbar-style-light'>
          {
            [...course].map((val:any, index) => {
              return (<div key={`${val+index}`} className='text-gray-500 flex justify-start items-center h-10'>
              <input id={val.short_head} onChange={courseHandler} type="checkbox" className='w-4 h-4'  />  <div className='ml-2'>{val.short_head}</div>
            </div>)
            })
          }
          </div>
        </div>

        <div className='w-full h-0.5 border-b p-2 hidden' ></div>

        <div className='p-2 rounded-lg'>
          <div className='text-xl font-extrabold'>
              State ( {stateState.size} )
          </div>
          <br />
          <div className='max-h-40 overflow-y-scroll scrollbar-style-light'>
          {
            [...state].map((val:any, index) => {
              return (<div key={`${val+index}`} className='text-gray-500 flex justify-start items-center h-10'>
              <input id={val.state} onChange={stateHandler} type="checkbox" className='w-4 h-4' value="Male" name="gender" />  <div className='ml-2'>{val.state}</div>
            </div>)
            })
          }
          </div>
        </div>

        <div className='w-full h-0.5 border-b p-2 hidden' ></div>
        <div className='p-2 rounded-lg'>
          <div className='text-xl font-extrabold'>
              City ( {cityState.size} )
          </div>
          <br />
          <div className='max-h-40 overflow-y-scroll scrollbar-style-light'>
          {
            [...city].map((val:any, index) => {
              return (<div key={`${val+index}`} className='text-gray-500 flex justify-start items-center h-10'>
              <input id={val.college_city} onChange={cityHandler} type="checkbox" className='w-4 h-4' value="Male" name="gender" />  <div className='ml-2'>{val.college_city}</div>
            </div>)
            })
          }
          </div>
        </div>

        <div className='w-full h-0.5 border-b p-2 hidden' ></div>
        <div className='p-2 rounded-lg'>
          <div className='text-xl font-extrabold'>
              placement( {placementState.size} )
          </div>
          <br />
          <div className='max-h-40 overflow-y-scroll scrollbar-style-light'>
          {
            [...placement].map((val:any, index) => {
              return (<div key={`${val+index}`} className='text-gray-500 flex justify-start items-center h-10'>
              <input id={val.company_name} onChange={placementHandler} type="checkbox" className='w-4 h-4' value="Male" name="gender" />  <div className='ml-2'>{val.company_name}</div>
            </div>)
            })
          }
          </div>
        </div>

        <button className='btn float-right bg-orange-600 text-xl font-md text-white px-10 mt-5 sticky bottom-3 left-4'
          onClick={()=> {
            ChangeInFiltervalue("city", Array.from(cityState))
            ChangeInFiltervalue("state", Array.from(stateState))
            ChangeInFiltervalue("placement_comapany", Array.from(placementState))
            ChangeInFiltervalue("courseState", Array.from(courseState))
            ChangeInFiltervalue("order", order)
          }}
        >Filter</button>
    </div>
  )
}

export default LeftFilterMenu