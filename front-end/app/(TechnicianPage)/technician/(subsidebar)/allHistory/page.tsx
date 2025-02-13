"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { requestInformation, TechnicianInfo } from "../data";
import Table from "../../_componenets/Table";
import Card from "../../_componenets/Card";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode"; // Correct import

// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}


const DoLatterPage = () => {
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
      fetch('http://localhost:3002/api/assignment/TechnicainInfo', {
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
      <div className="flex justify-start mb-4">
        <button
          onClick={() => handleToggleView("table")}
          className={`px-4 py-2 mr-2 ${viewType === "table"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
            } rounded-md`}
        >
          Table
        </button>
        <button
          onClick={() => handleToggleView("card")}
          className={`px-4 py-2 ${viewType === "card"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
            } rounded-md`}
        >
          Card
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : viewType === "table" ? (
        <Table requests={requests} />
      ) : (
        <Card requests={requests} />
      )}
    </div>
  );
};



export default DoLatterPage;
