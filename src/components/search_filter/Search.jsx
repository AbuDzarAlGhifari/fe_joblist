import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-fit">
      <Input
        label="search"
        icon={<MdSearch />}
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
