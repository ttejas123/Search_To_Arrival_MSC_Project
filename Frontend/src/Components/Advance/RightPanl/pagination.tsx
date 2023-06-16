import { ForwordNdBackword } from '../../../assets/Icons/Icons';
import React, {useState, useContext} from 'react'
import { CollegeContext } from '../../../context/CollegeContext';
// import { IconChevronLeft, IconChevronRight } from 'react-icons/md';


interface PaginationProps {
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const {ChangeInFiltervalue} = useContext(CollegeContext)
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    ChangeInFiltervalue("pageNumber", pageNumber)
  };

  const pageNumbers = [];

  // Show the first and last two pages, and dots in between
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
  }

  return (
    <div className="flex justify-end space-x-2 mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className='p-1'
      >
        <ForwordNdBackword rev active />
      </button>
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={currentPage === pageNumber ? 'border-red-400 border px-2.5 p-1 rounded-md' : 'default p-1'}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === '...'}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={currentPage === pageCount}
        onClick={() => handlePageChange(currentPage + 1)}
        className='p-1'
      >
        <ForwordNdBackword  active />
      </button>
    </div>
  );
};

export default Pagination;
