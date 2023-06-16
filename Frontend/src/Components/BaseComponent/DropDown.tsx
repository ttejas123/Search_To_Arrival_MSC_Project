import React, { useState } from 'react';

export interface labelandoption {
    label: string, 
    value: string
}

interface DropDownlableAndValueProps {
    option: labelandoption[],
    setValue: any
}

const Dropdown = ({option, setValue}:DropDownlableAndValueProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<labelandoption>({label: "", value: ""});

  const handleOptionSelect = (val:labelandoption) => {
    setSelectedOption(val);
    setValue(val.value)
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="py-2 px-9 bg-gray-300 text-gray-800 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label.length > 0 ? selectedOption.label : 'Select an option'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-80 text-sm py-2 bg-white rounded-xl shadow-lg text-black h-72 overflow-auto scrollbar-style-dark">
          {option.map((val, index) => (
            <li
              key={index}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handleOptionSelect(val)}
            >
              {val.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
