import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Department {
  department_id: number;
  department_name: string;
}

const RemoveDepartment: React.FC = () => {
  const [departmentList, setDepartmentList] = useState<Department[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/registers/getDepartments')
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((error) => {
        toast.error(`There was an error fetching the departments: ${error}`);
        window.location.reload();
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete('http://localhost:3002/api/registers/removeDepartment/', {
        params: { id },
      })
      .then(() => {
        setDepartmentList((prevDepartmentList) =>
          prevDepartmentList.filter(
            (department) => department.department_id !== id
          )
        );
        toast.success('Department deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        toast.error(
          `You cannot delete this department. It has relations with other tables: ${error}`
        );
        window.location.reload();
      });
  };

  return (
    <div className="container mx-auto p-4 w-3/4 md:ml-64">
      <h2 className="font-bold text-2xl mb-6 text-center">Remove Department</h2>
      <div className="bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-t-lg flex flex-wrap justify-between items-center">
        <div className="w-full sm:w-1/4 text-center sm:text-left">ID</div>
        <div className="w-full sm:w-1/2 text-center">Name</div>
        <div className="w-full sm:w-1/4 text-center sm:text-right">Action</div>
      </div>
      <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md">
        {departmentList.map((dl) => (
          <li
            key={dl.department_id}
            className="flex justify-between items-center py-3 px-4 sm:px-6"
          >
            <div className="w-1/4 text-center sm:text-left">
              {dl.department_id}
            </div>
            <div className="w-1/2 text-center">{dl.department_name}</div>
            <div className="w-1/4 text-center sm:text-right">
              <button
                className="text-white bg-red-500 rounded-full transform hover:transition-transform hover:translate-y-1 
                            hover:shadow-lg py-2 px-4"
                onClick={() => handleDelete(dl.department_id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default RemoveDepartment;
