import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';

interface SearchInputProps {
  placeholder?: string;
  label?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Enter search here',
  onSearch,
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center">
        <input
          type="search"
          id="default-search"
          className="text-sm text-gray-900 border-inside border-gray-300 rounded-s-lg bg-gray-50"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-e-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Search
        </button>
      </div>
    </form >
  );
};

export default SearchInput;