'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios'; // Import axios for fetching data
import CompletedTable from '../../_componenets/completedTable';
import CompletedCards from '../../_componenets/completedCards';

const CompletedPAge = () => {
  const [viewType, setViewType] = useState('table');
  const [sortBy, setSortBy] = useState('technicianName');
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch completion data from the server
  useEffect(() => {
    const fetchCompletions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/feedbacks/getCompletions'
        );
        setCompletions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completions:', error);
        setLoading(false);
      }
    };

    fetchCompletions();
  }, []);

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  // Sort the data based on selected criteria
  // const sortedRequests = completions.slice().sort((a, b) => {
  //   if (sortBy === 'technicianName') {
  //     return a.Technician.name.localeCompare(b.Technician.name);
  //   } else if (
  //     sortBy === 'EmployeeRating' &&
  //     a.feedbackRecived &&
  //     b.feedbackRecived
  //   ) {
  //     return a.feedbackRecived.rating - b.feedbackRecived.rating;
  //   }
  //   return 0;
  // });

  const handleToggleView = (view) => {
    setViewType(view);
  };

  if (loading) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <button
            onClick={() => handleToggleView('table')}
            className={`px-4 py-2 mr-2 ${
              viewType === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-md`}
          >
            Table
          </button>
          <button
            onClick={() => handleToggleView('card')}
            className={`px-4 py-2 ${
              viewType === 'card'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-md`}
          >
            Card
          </button>
        </div>
        <select
          value={sortBy}
          onChange={handleSort}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="technicianName">Sort by Technician Name</option>
          <option value="EmployeeRating">Sort by Employee Rating</option>
        </select>
      </div>
      {viewType === 'table' ? (
        <CompletedTable requests={completions} />
      ) : (
        <CompletedCards requests={completions} />
      )}
    </div>
  );
};

export default CompletedPAge;
