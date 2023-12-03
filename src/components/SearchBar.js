// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const newData = data.filter(item => 
     (item.id.toString().includes(searchTerm)) ||
     (item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (item.role.toLowerCase().includes(searchTerm.toLowerCase())));
    setData(newData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{margin: '5px', padding: '5px'}}
      />
      <button onClick={handleSearch}
       style={{margin: '2px', padding: '8px', color: 'white', backgroundColor: '#3333FF', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
       
      >Search</button>
    </div>
  );
};

export default SearchBar;
