import React from 'react'

interface InputGroupProps {
    label: boolean;
    placeholder: string;
    onClick?: ()=> void;
}
function InputGroup({onClick, placeholder}:InputGroupProps) {
  return (
    <div className="form-control">
        <div className="input-group">
            <input type="text" placeholder={placeholder} className="input input-bordered border-orange-600 input-primary" />
            <button className="btn btn-square MainthemeBackGroundColor border-2 border-orange-600" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
    </div>
  )
}

export default InputGroup