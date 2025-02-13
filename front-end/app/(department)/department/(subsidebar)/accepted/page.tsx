"use client";
import React, { useState, useEffect } from "react";
import Table from "../../_components/Table";
import Card from "../../_components/Card";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

const AcceptedRequest = () => {
  const [viewType, setViewType] = useState("table");
  const [sortBy, setSortBy] = useState("Urgency");
  const department = "IT"; // Adjust if department is dynamic or fetched

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  interface DecodedToken {
    userId: string;
    username: string;
    role: string;
  }

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );
      return authTokenCookie ? authTokenCookie.split("=")[1] : null;
    };

    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      // Fetch requests from the API
      fetch("http://localhost:3002/api/requests/maintenancerequestsApproval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Authorization header
        },
        body: JSON.stringify({ department }), // Pass department if required
      })
        .then((response) => response.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Filter requests to show only accepted ones
  const acceptedRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  const handleToggleView = (view) => {
    setViewType(view);
  };

  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  const sortedRequests = acceptedRequests.slice().sort((a, b) => {
   if (sortBy === "Status") {
      return a.status.localeCompare(b.status);
    } else if (sortBy === "RequestType") {
      return a.requestType.localeCompare(b.requestType);
    }
    return 0;
  });

  return (
    <div className="p-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => handleToggleView("table")}
            className={`px-4 py-2 ${
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
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={handleSort}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="Urgency">Sort by Urgency</option>
            <option value="Status">Sort by Status</option>
            <option value="RequestType">Sort by Request Type</option>
          </select>
        </div>
      </div>
      {viewType === "table" ? (
        <div className="overflow-x-auto">
          <Table requests={sortedRequests} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card requests={sortedRequests} />
        </div>
      )}
    </div>
  );
};

export default AcceptedRequest;
