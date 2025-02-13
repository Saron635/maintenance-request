'use client';

import { BarChart2, CheckSquare, FileText, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '../../_componenets/Table';
import axios from 'axios';

export default function Home() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const cardData = [
    {
      icon: BarChart2,
      number: '15+',
      text: 'Assigned & Pending',
    },
    {
      icon: Users,
      number: '18+',
      text: 'Total Requests',
    },
    {
      icon: FileText,
      number: '10+',
      text: 'Requesting Department',
    },
    {
      icon: CheckSquare,
      number: '12+',
      text: 'Completed',
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/requests/getPendingRequests')
      .then((response) => {
        setPendingRequests(response.data);
        console.log(response.data);
      })
      .catch((err: any) => {
        console.log(err.message);
        alert(err.message);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* First Row: Cards */}{/* Second Row: Analysis Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-200 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 ">Pie Chart Analysis</h2>
          <div className="flex h-64 justify-center">
            <PieChart /> {/* Display Pie Chart */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="bg-slate-200 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Bar Chart Analysis</h2>
          <div className="flex justify-center h-64">
            <BarChart /> {/* Display Bar Chart */}
      {/* </div>
        </div> */}
      {/* // </div> */}
      <Table requests={pendingRequests} />
    </div>
  );
}
