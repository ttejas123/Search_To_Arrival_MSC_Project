import React, { ReactNode, useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
// import { useSelector } from 'react-redux';

interface Column {
  key: string;
  title: string;
  format?: (value: any) => string;
  sortable?: boolean;
}

interface DataTableProps {
  data: {
    [key: string]: any;
  }[];
  columns: Column[];
  CustomHeader?: ReactNode;
  size?: "md" | "xs" 
}

const DataTableComponent: React.FC<DataTableProps> = ({ data, columns, CustomHeader, size }) => {
  const theme = useContext(ThemeContext)
  const expandState = true  
  const [sorting, setSorting] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = sorting
    ? [...data].sort((a, b) => {
        const valueA = a[sorting.key];
        const valueB = b[sorting.key];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sorting.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
          return sorting.direction === 'asc' ? valueA - valueB : valueB - valueA;
        }
      })
    : data;

  const handleSortClick = (key: string) => {
    const column = columns.find((c) => c.key === key);
    if (column && column.sortable) {
      if (sorting && sorting.key === key) {
        setSorting({ key, direction: sorting.direction === 'asc' ? 'desc' : 'asc' });
      } else {
        setSorting({ key, direction: 'asc' });
      }
    }
  };

  return (
    <div className='relative'>
    {
      !CustomHeader ? (<div className="bg-neutral-focus w-full my-5 rounded-xl ">
          <div className='flex justify-between'>
            {columns.map((column) => (
              <div
                key={column.key}
                className={`py-6 ${column.sortable ? 'cursor-pointer' : ''} flex-1 flex justify-center font-bold`}
                onClick={() => handleSortClick(column.key)}
              >
                {column.title}
                {column.sortable && (
                  <span className="">
                    {sorting?.key === column.key && (
                      <i
                        className={`fas fa-sort-${sorting.direction === 'asc' ? 'up' : 'down'}`}
                        aria-hidden="true"
                      ></i>
                    )}
                    {sorting?.key !== column.key && <i className="fas fa-sort" aria-hidden="true"></i>}
                  </span>
                )}
              </div>
            ))} 
          </div>
      </div>) : (
        <>{CustomHeader}</>
      )
    }
    <div className="w-full mb-4">
      <div className={`w-full rounded-2xl transition-all ease-in-out delay-150 ${expandState ? "h-[30rem]" : "h-80"} overflow-y-auto ${theme.theme == 'light' ? "scrollbar-style-light" : "scrollbar-style-dark"} scroll-smooth `}>
        {sortedData.map((row, index) => (
          <div key={index} className={`${index % 2 === 0 ? 'bg-neutral-focus' : 'bg-neutral'} flex flex-wrap justify-between items-center hover:scale-95 transition-all`}>
            {columns.map((column) => (
              <div key={column.key} className={`${theme.theme == "light" && ""} px-4 ${size == "xs" ? "py-2 text-overline" : "py-4"} text-center flex-1 font-bold`}>
                {column.format ? column.format(row[column.key]) : row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className='bg-red-40 expandblePill w-full border-none absolute bottom-0 left-0'></div>
    </div>
  );
};

export default DataTableComponent;