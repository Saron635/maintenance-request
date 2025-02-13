'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Table from '../../_componenets/Table';
import Card from '../../_componenets/Card';
import RequestTable from '../../_componenets/assignedComponents';

const AssignPage = () => {
  const [requests, setRequests] = useState([]);
  const [viewType, setViewType] = useState('table');
  const [sortBy, setSortBy] = useState('Urgency');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from server when the page loads
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/assigningTechnician/requestAndAssignedTechnicianDetail'
        ); // Replace with your API endpoint
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  // const sortedRequests = requests.slice().sort((a, b) => {
  //   if (sortBy === 'Urgency') {
  //     return a.priority.localeCompare(b.priority);
  //   } else if (sortBy === 'RequestType') {
  //     return a.requestType.localeCompare(b.requestType);
  //   }
  //   return 0;
  // });

  const handleToggleView = (view) => {
    setViewType(view);
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Show error if data fetching fails
  }

  return (
    <div className="p-6 space-y-6">
      {/* First Row: Cards */}
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
          {/* <button
            onClick={() => handleToggleView('card')}
            className={`px-4 py-2 ${
              viewType === 'card'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-md`}
          >
            Card
          </button> */}
        </div>
        <select
          value={sortBy}
          onChange={handleSort}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="Urgency">sort by Urgency</option>
          <option value="RequestType">sort by Request Type</option>
        </select>
      </div>
      {
        viewType === 'table' ? <RequestTable requests={requests} /> : ''
        // (
        //   <Card requests={sortedRequests} />
        // )}
      }
    </div>
  );
};

export default AssignPage;
