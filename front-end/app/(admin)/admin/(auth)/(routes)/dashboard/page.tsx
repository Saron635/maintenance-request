'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../../../_componenets/AdminComp/navbar';
import { Sidebar } from '../../../_componenets/AdminComp/sidbar';
import RemoveRequestType from '../../../_componenets/AdminComp/RemoveRequestType';
import AddRequestType from '../../../_componenets/AdminComp/AddRequestType';
import RemoveDepartment from '../../../_componenets/AdminComp/RemoveDepartment';
import AddDepartment from '../../../_componenets/AdminComp/AddDepartment';
import AddUser from '../../../_componenets/AdminComp/AddUser';
import AddHelpDesk from '../../../_componenets/AdminComp/AddHelpDesk';

function Page() {
  const [activeTab, setActiveTab] = useState<string>(' ');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'removeRequest':
        return <RemoveRequestType />;
      case 'addRequest':
        return <AddRequestType />;
      case 'removeDepartment':
        return <RemoveDepartment />;
      case 'addDepartment':
        return <AddDepartment />;
      case 'addUser':
        return <AddUser />;
      case 'helpDesk':
        return <AddHelpDesk />;
      default:
        return <RemoveRequestType />;
    }
  };

  const handleTabClick = (TabName: string) => {
    setActiveTab(TabName);
    localStorage.setItem('activeTab', TabName);
  };

  useEffect(() => {
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
      setActiveTab(activeTab);
    } else {
      setActiveTab('addUser');
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[80px] md:pl-60 fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed top-0 inset-y-0 z-40">
        <Sidebar />
      </div>

      <div className="pt-[80px] md:pl-60 flex-grow">
        <div className="flex flex-wrap items-center m-8 p-2 text-bold text-lg gap-4">
          <button
            onClick={() => handleTabClick('removeRequest')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'removeRequest' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Remove Request Type
          </button>
          <button
            onClick={() => handleTabClick('addRequest')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'addRequest' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Add Request Type
          </button>
          <button
            onClick={() => handleTabClick('removeDepartment')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'removeDepartment' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Remove Department
          </button>
          <button
            onClick={() => handleTabClick('addDepartment')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'addDepartment' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Add Department
          </button>
          <button
            onClick={() => handleTabClick('addUser')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'addUser' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Add User
          </button>
          <button
            onClick={() => handleTabClick('helpDesk')}
            className={`py-2 px-4 rounded-lg transform hover:transition-transform translate-y-1 ${activeTab === 'helpDesk' ? 'bg-blue-500 text-white' : 'bg-slate-200 hover:bg-blue-500 hover:text-white'}`}
          >
            Add Help Desk
          </button>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Page;
