'use Client';
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const DeactivatedUser = () => {
  const [userLists, setUsersLists] = useState<any[]>([]);
  //   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [sortUserList, setSortedUserList] = useState(userLists);
  const [sortedBy, setSortBy] = useState('username');
  //   const [departments, setDepartments] = useState<any[]>([]);

  const handleSort = (e) => {
    const sortedField = e.target.value;
    setSortBy(sortedField);
  };
  const sortedUserDetails = sortUserList.slice().sort((a, b) => {
    if (sortedBy === 'username') {
      return a.username.localeCompare(b.username);
    } else if (sortedBy === 'role') {
      return a.role.localeCompare(b.role);
    } else if (sortedBy === 'department_name') {
      return a.Department.department_name.localeCompare(
        b.Department.department_name
      );
    }
    return 0;
  });

  //pagintion
  const router = useRouter();
  const pathname = usePathname();
  const routeString = pathname.split('/admin/').pop();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(userLists.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = sortedUserDetails.slice(startIndex, endIndex);

  console.log('Rendered request: ' + requestToBeRendered);

  useEffect(() => {
    setSortedUserList(userLists);
  }, [userLists]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/registers/getDisabledUsersList')
      .then((response) => setUsersLists(response.data))
      .catch((error) => {
        toast.error(`There was an error fetching the users list!, ${error}`);
        window.location.reload()
      });

 
  }, []);

  const handleStatusChange = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/registers/updateUserStatus?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activated: !currentStatus }),
        }
      );
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        toast.success('Status updated successfully');
        // Refresh the page after the alert
        window.location.reload();
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error(`Fetching error: ${err}`);
      toast.error(`Failed to update: ${err}`);
    }
  };


  return (
    <>
    
      <div className="sm:mx-20 md:pl-56 ">
        <div className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2">
          <select
            value={sortedBy}
            onChange={handleSort}
            className="text-center text-white bg-black"
          >
            <option value="username">sort by username</option>
            <option value="department">sort by department</option>
            <option value="role">sort by role</option>
          </select>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Users Detail</h2>
        <div className="bg-gray-200 text-gray-700 px-6 py-3 flex rounded-t-lg justify-between">
          <div className="w-1/12">ID</div>
          <div className="w-2/12">Username</div>
          <div className="w-3/12">Email</div>
          <div className="w-2/12">Phone Number</div>
          <div className="w-2/12">Department</div>
          <div className="w-2/12">Role</div>
          <div className="w-1/12">Status</div>
        </div>
        <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md">
          {requestToBeRendered.map((ul) => (
            <li
              key={ul.user_id}
              className="flex justify-between items-center px-6 py-3"
            >
              <span className="w-1/12">{ul.user_id}</span>
              <span className="w-2/12">{ul.username}</span>
              <span className="w-3/12">{ul.email}</span>
              <span className="w-2/12">{ul.phone_number}</span>
              <span className="w-2/12">{ul.Department.department_name}</span>
              <span className="w-2/12">{ul.role}</span>
              <span className="w-1/12">
                <button
                  onClick={() => handleStatusChange(ul.user_id, ul.activated)}
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                     hover:shadow-lg transform hover:transition-transform hover:translate-y-1 ${
                       ul.activated === true
                         ? 'bg-green-200 text-green-800'
                         : 'bg-red-200 text-red-800'
                     }`}
                >
                  {ul.activated === true ? 'Active' : 'Disabled'}
                </button>
              </span>
            </li>
          ))}
        </ul>
        {/* 
        <button
          className="bg-orange-400 text-lg text-black justify-center py-2 px-4 m-6 rounded-full
           hover:bg-orange-600 transform hover:transition-transform hover:translate-y-1 hover:shadow-md"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          + Add User
        </button> */}
      </div>
      <div className="flex justify-end mt-4 mr-11 ">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-950 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800"
          onClick={() =>
            setCurrentPage((next) => Math.min(next + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default DeactivatedUser;
