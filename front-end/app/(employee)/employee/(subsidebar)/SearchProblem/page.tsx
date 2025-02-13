'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {Navbar} from '@/app/(employee)/employee/_componenets/EmpComp/navbar'
import {Sidebar} from '@/app/(employee)/employee/_componenets/EmpComp/sidebar'
// Debounce function to limit the rate of API calls
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Function to truncate text with ellipsis
const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const SearchProblem = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `http://localhost:3002/api/search/searchProblems?query=${query}`,
          {
            method: 'GET',
          }
        );
        if (!response.ok) {
          const message = await response.json();
          throw new Error(message.error || 'Something went wrong');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message || 'Error occurred during search.');
      } finally {
        setLoading(false);
      }
    }, 300), // Adjust delay as needed
    []
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClick = (id: number) => {
    router.push(`/employee/api/item/${id}`);
  };

  return (
    < div className=''>
      <div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ml-4">
        <Sidebar />
      </div>
      
     
      <div className="md:pl-72 pt-[82px] h-full mt-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Search for Help Desks</h1>
          <div className="flex items-center mb-6">
            <input
              type="text"
              className="flex-grow border border-gray-300 p-2 rounded-lg"
              placeholder="Enter a problem to search..."
              value={searchQuery}
              onChange={handleChange} // Trigger search on input change
            />
            <button
              className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              onClick={() => debouncedSearch(searchQuery)}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {searchQuery && searchResults.length > 0 && (
            <ul className="space-y-4">
              {searchResults.map((result: any, index: number) => (
                <li
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition hover:transition-transform translate-y-1 cursor-pointer"
                  onClick={() => handleClick(result.solution_id)}
                >
                  <h2 className="text-xl font-semibold">{result.title}</h2>
                  {/* <p className="text-blue-600">{truncateText(result.description, 50)}</p> Truncate description */}
                </li>
              ))}
            </ul>
          )}

          {searchQuery && searchResults.length === 0 && !loading && (
            <p className="text-gray-600">
              No results found. Try searching for a different problem.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProblem;
