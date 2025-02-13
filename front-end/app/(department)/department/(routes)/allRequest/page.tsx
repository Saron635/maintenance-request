"use client";

import React, { useEffect } from "react";
import Table from "../../_components/Table";
import Card from "../../_components/Card";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode"; // Correct import

// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}

const AllRequest = () => {
  const [viewType, setViewType] = useState("table");
  const [sortBy, setSortBy] = useState("Urgency");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const router = useRouter();


  

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
    console.log(decodedToken.username)
    setEmployeeName(decodedToken.username);
    

     // Fetch requests from the API
     fetch('http://localhost:3002/api/requests/maintenancerequestsApproval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Authorization header
      },
      body: JSON.stringify({ employeeName: decodedToken.username }), // Pass employeeName here
    
    })
    .then((response) => response.json() 
  
  )
    .then((data) => {
      setRequests(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching requests:', error);
      setLoading(false);
    });
   

  } else {
    setLoading(false);
  }
}, []);

const sortedRequests = requests.slice().sort((a, b) => {
  // if (sortBy === "Urgency") {
  //   return a.priority.localeCompare(b.priority);
  // }  
  if (sortBy === "Status") {
    return a.status.localeCompare(b.status);
  } else if (sortBy === "RequestType") {
    return a.request_type?.localeCompare(b.request_type || "") || 0;
  }
  return 0;
});


  // const department = "IT";
  // const requestsByDepartment = requests.filter(
  //   (request) => request.department === department
  // );

  const handleToggleView = (view) => {
    setViewType(view);
  };
  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
  };

  // const sortedRequests = requestsByDepartment.slice().sort((a, b) => {
  //   if (sortBy === "Urgency") {
  //     return a.Urgency.localeCompare(b.Urgency);
  //   } else if (sortBy === "Status") {
  //     return a.status.localeCompare(b.status);
  //   } else if (sortBy === "RequestType") {
  //     return a.requestType.localeCompare(b.requestType);
  //   }
  //   return 0;
  // });
  const handleClickRoute = (id: Number) => {
    const randomId = Math.floor(Math.random() * 10000); // Change 10000 to any maximum number if needed
   
    router.push(`/department/api/newForm/${randomId}`);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex mb-4">
          <button
            onClick={() => handleToggleView("table")}
            className={`px-4 py-2 mr-2 hidden md:block ${
              viewType === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } rounded-md`}
          >
            Table
          </button>
          <button
            onClick={() => handleToggleView("card")}
            className={`md:block px-4 py-2 hidden ${
              viewType === "card"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } rounded-md`}
          >
            Card
          </button>
        </div>
        <div className="flex gap-5">
          <div className="flex  border border-gray-300 bg-blue-900 text-center items-center text-white p-2 rounded-lg">
            <div className="text-gray-200 text-center">
              <Plus />
            </div>
            <div>
              <button
                className="text-gray-200 items-end flex-row"
                onClick={() => handleClickRoute()}
              >
                New Request
              </button>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={handleSort}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="Urgency">sort by Urgency</option>
            <option value="Status">sort by Status</option>
            <option value="RequestType">sort by Request Type</option>
          </select>
        </div>
      </div>
      {/* New Request button */}

      {viewType === "table" ? (
        <div >
        <Table requests={sortedRequests} />
        </div>
      ) : (
        <Card requests={sortedRequests} />
      )}
    </div>
  );
};
export default AllRequest;
