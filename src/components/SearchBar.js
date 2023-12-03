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
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
