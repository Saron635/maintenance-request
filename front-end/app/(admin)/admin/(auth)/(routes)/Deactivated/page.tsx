'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../../../_componenets/AdminComp/navbar';
import { Sidebar } from '../../../_componenets/AdminComp/sidbar';
import DeactivatedUser from '../../../_componenets/AdminComp/DeactivatedUser';

function Page() {
  const [usersLists, setUsersLists] = useState<any[]>([]);

  // useEffect(() => {
  //   usersList();
  // }, []);

  // const usersList = async () => {
  //   const response = await fetch(
  //     'http://localhost:3002/api/registers/getDisabledUsersList',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   try {
  //     const data: any[] = await response.json();
  //     if (response.ok && Array.isArray(data)) {
  //       //response from server
  //       setUsersLists(data);
  //     } else {
  //     }
  //   } catch (err) {
  //     console.error(`Server: ${err}`);
  //   }
  // };

  // This effect will log the updated usersLists whenever it changes
  // useEffect(() => {
  //   console.log('Updated usersLists:', usersLists);
  // }, [usersLists]); // Dependency array includes usersLists to track changes

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full  top-0 z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed top-0 inset-y-0 z-40 ml-4">
        <Sidebar />
      </div>

      <div className="pt-[80px] md:pl-60">
        <div className="p-4">{/* <Table requests={usersLists} /> */}</div>
      </div>
      <DeactivatedUser />
    </div>
  );
}

export default Page;
