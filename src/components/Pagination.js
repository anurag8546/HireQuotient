// components/Pagination.js
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul
      style={{ display: 'flex', listStyleType: 'none', justifyContent:'right' , margin: '5px', padding: '5px' }}
      >
        {pageNumbers.map((number) => (
          <li key={number}
          style={{ padding: '2px' }}  
>
            <button onClick={() => setCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
