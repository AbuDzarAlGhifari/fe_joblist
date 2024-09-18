import { Input } from '@material-tailwind/react';
import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = () => {
  return (
    <div className="w-fit">
      <Input label="search" icon={<MdSearch />} />
    </div>
  );
};

export default Search;
