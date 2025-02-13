"use client";

import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { requestInformation } from "../data";
import Table from "../../_componenets/Table";
import Card from "../../_componenets/Card";
const AssignedPendigPage = () => {
  const AssignedAndPendingRequest = requestInformation.filter(
    (request) => request.status === "assigned"
  );
  const [viewType, setViewType] = useState("table");

  const [sortBy, setSortBy] = useState("Urgency");

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  const sortedRequests = AssignedAndPendingRequest.slice().sort((a, b) => {
    if (sortBy === "Urgency") {
      return a.Urgency.localeCompare(b.Urgency);
    } else if (sortBy === "RequestType") {
      return a.requestType.localeCompare(b.requestType);
    }
    return 0;
  });

  const handleToggleView = (view) => {
    setViewType(view);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <button
            onClick={() => handleToggleView("table")}
            className={`px-4 py-2 mr-2 ${
              viewType === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } rounded-md`}
          >
            Table
          </button>
          <button
            onClick={() => handleToggleView("card")}
            className={`px-4 py-2 ${
              viewType === "card"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
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
          <option value="Urgency">sort by Urgency</option>
          <option value="RequestType">sort by Request Type</option>
        </select>
      </div>

      {viewType === "table" ? (
        <Table requests={sortedRequests} />
      ) : (
        <Card requests={sortedRequests} />
      )}
    </div>
  );
};

export default AssignedPendigPage;
