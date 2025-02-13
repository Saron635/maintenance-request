"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../_componenets/EmpComp/navbar";
import { Sidebar } from "../../_componenets/EmpComp/sidebar";
import { requests } from "../../empData";
import { TabTable }from "../../_componenets/EmpComp/TabTable";

import jwtDecode from "jwt-decode"; // Correct import

// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}


const SettingsPage = () => {

  const [employeeName, setEmployeeName] = useState<string>("");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      fetch('http://localhost:3002/api/requests/maintenancerequests', {
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
  

  if (loading) {
    return <div className="flex justify-center items-center bg-blue-400 h-full">Loading...</div>;
  }


  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full top-0 z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed top-0 inset-y-0 z-40 ml-4">
        <Sidebar />
      </div>

      <div className="pt-[80px] md:pl-60">
        <TabTable requests={requests} />
      </div>
    </div>
  );
};

export default SettingsPage;
