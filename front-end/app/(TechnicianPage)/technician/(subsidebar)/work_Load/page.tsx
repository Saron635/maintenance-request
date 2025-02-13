"use client";

import { Button } from "@/components/ui/button";

import React, { useState, useEffect } from 'react';
import { requestInformation, TechnicianInfo } from "../data";
import Table from "../../_componenets/Table";
import Card from "../../_componenets/Card";
import jwtDecode from "jwt-decode"; // Correct import
import { useRouter } from "next/navigation";
// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}


const AssignPage = () => {
  // const technicianName = "Abebe Belete";

  // // Find the technician's info
  // const technician = TechnicianInfo.find(tech => tech.technicianName === technicianName);

  // if (!technician) {
  //   return <div>Technician not found</div>;
  // }

  // // Extract pending and finished request IDs
  // const pendingRequestIds = technician.workLoad.pending.map(work => parseInt(work.requestId));
  // // Filter the request information based on the IDs
  // const filteredRequests = requestInformation.filter(request =>
  //   pendingRequestIds.includes(request.id)
  // );

  //  //filter the doed later
  //  const filterDoedLatter = filteredRequests.filter(
  //   (request) => request.status === "assigned" 
  // );


  const [employeeName, setEmployeeName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<any[]>([]);

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
      setEmployeeName(decodedToken.username);

      // Fetch requests from the API
      fetch('http://localhost:3002/api/assignment/TechnicainInfoWorkLoad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Authorization header
        },
        body: JSON.stringify({ employeeName: decodedToken.username }), // Pass employeeName here
      })
        .then((response) => response.json())
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


  const [viewType, setViewType] = useState("table");


 
  const handleToggleView = (view) => {
    setViewType(view);
  };

  
    
  return (
    <div className="p-6 space-y-6">
      {/* First Row: Cards */}
      <div className="flex justify-start mb-4">
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
      
      {viewType === "table" ? (
        <Table requests={requests} />
      ) : (
              <Card requests={requests} />
      )}


  
      
    </div>
  );
};

export default AssignPage;


