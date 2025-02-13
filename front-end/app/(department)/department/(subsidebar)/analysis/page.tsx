"use client";
import { useState, ChangeEvent } from "react";
import { BarChart2, CheckSquare, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import CountUp from "react-countup";
import { requests } from "../../data";

const AnalysisPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2024-07");

  const totalRequests = requests.length;
  const completedRequests = requests.filter(
    (request) => request.status === "accepted"
  ).length;
  const inProgressRequests = requests.filter(
    (request) => request.status === "inprogress"
  ).length;
  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  ).length;

  const cardData = [
    {
      icon: BarChart2,
      number: `${inProgressRequests}+`,
      text: "InProgress Requests",
    },
    {
      icon: FileText,
      number: `${totalRequests}+`,
      text: "Total Requests",
    },
    {
      icon: Users,
      number: "10+",
      text: "Employee Requested till Now",
    },
    {
      icon: CheckSquare,
      number: `${completedRequests}+`,
      text: "Accepted Requests",
    },
  ];

  const completedData = {
    sessions: [
      {
        label: "Received",
        size: totalRequests,
        c: totalRequests * 1000, // Example calculation, replace with actual logic
        color: "green-500",
      },
      {
        label: "Completed",
        size: completedRequests,
        c: completedRequests * 1000, // Example calculation, replace with actual logic
        color: "green-400",
      },
      {
        label: "Do Later",
        size: inProgressRequests,
        c: inProgressRequests * 1000, // Example calculation, replace with actual logic
        color: "green-300",
      },
      {
        label: "Rejected",
        size: rejectedRequests,
        c: rejectedRequests * 1000, // Example calculation, replace with actual logic
        color: "green-200",
      },
    ],
  };

  // Handle date change
  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
    // logic to update the data based on the selected date
  };

  return (
    <div className="p-6 space-y-6">
      {/* First Row: Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-md rounded-lg p-6 flex items-center space-x-4"
          >
            <div className="text-blue-500">
              <card.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{card.number}</div>
              <div className="text-gray-500">{card.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row: Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-200 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Pie Chart Analysis</h2>
          <div className="flex justiy-center h-64">
            <PieChart /> {/* Display Pie Chart */}
          </div>
        </div>
        <div className="bg-gray-200  shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Bar Chart Analysis</h2>
          <div className="flex justiy-center h-64">
            <BarChart /> {/* Display Bar Chart */}
          </div>
        </div>
      </div>

      {/* Third Row: Completed Analysis Card */}
      <div className="bg-gray-200 shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-end">
          <div className="relative">
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 focus:outline-none"
            >
              <option value="2024-07">July 2024</option>
              <option value="2024-06">June 2024</option>
              <option value="2024-05">May 2024</option>
              <option value="2024-04">April 2024</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-4 text-green-600">
          Total Completed Requests
        </h2>
        <div className="grid grid-cols-2 gap-4 h-64">
          {completedData.sessions.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-medium">{item.label}</span>
              <CountUp
                start={0}
                end={item.c}
                duration={1.6}
                separator=","
                prefix="$"
                className="text-lg font-bold"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
