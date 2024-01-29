// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
<div className="mb-4 items-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 w-12/12 mr-2 rounded mb-2"
    placeholder="Buscar producto..."
  />
  <button
    className="bg-green-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-yellow-500"
    onClick={handleSearch}
  >
    Buscar
  </button>
</div>
  );
};
export default SearchBar;
