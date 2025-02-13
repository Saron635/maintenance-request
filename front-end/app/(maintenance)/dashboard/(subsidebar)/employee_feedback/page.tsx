"use client";

import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { TechnicianInfoComplitedjob } from "../data";
import FeedbackCards from "../../_componenets/completedCards";

const EmployeeFeedbackPage = () => {
  const [viewType, setViewType] = useState("table");

  const [sortBy, setSortBy] = useState("technicianName");

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  const sortedRequests = TechnicianInfoComplitedjob.slice().sort((a, b) => {
    if (sortBy === "technicianName") {
      return a.technicianName.localeCompare(b.technicianName);
    } else if (sortBy === "EmployeeRating") {
      return a.EmployeeRating.localeCompare(b.EmployeeRating);
    }
    return 0;
  });

  const handleToggleView = (view) => {
    setViewType(view);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Employee's Feedback
      </h1>
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={handleSort}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="technicianName">sort by Technician Name</option>
          <option value="EmployeeRating">sort by Employee Rating</option>
        </select>
      </div>

      <FeedbackCards requests={sortedRequests} />
    </div>
  );
};

export default EmployeeFeedbackPage;
