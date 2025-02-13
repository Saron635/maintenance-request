// 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface Department {
  department_id: number;
  department_name: string;
}

const AddDepartment: React.FC = () => {
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [isAddDepartmentModal, setIsAddDepartmentModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/registers/getDepartments')
      .then((response) => {
        setDepartmentList(response.data);
      })
      .catch((error) => {
        toast.error(`There was an error fetching the departments: ${error}`);
        window.location.reload()
      });
  }, []);

  const handleAddDepartmentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const departmentName = formData.get('departmentName') as string;

    if (departmentName.trim() === '') {
      toast.error('Department name is required');
      window.location.reload()
      return;
    }

    axios
      .post('http://localhost:3002/api/registers/departments', {
        department_name: departmentName,
      })
      .then((response) => {
        setDepartmentList([...departmentList, response.data]);
        toast.success('Department added successfully');
        window.location.reload()
        setIsAddDepartmentModal(false); // Close the modal on success
      })
      .catch((error) => {
        toast.error(`Error adding department: ${error}`);
        window.location.reload()
      });
  };

  return (
    <div className="max-w-4xl md:mx-auto px-4 sm:px-6 lg:px-8 md:pl-64">
      <h2 className="font-bold text-2xl mb-6 text-center">Add New Department</h2>
      <div className="bg-gray-200 text-gray-700 px-6 py-3 rounded-t-lg flex justify-between">
        <div className="w-1/3 text-sm sm:text-base">ID</div>
        <div className="w-1/2 text-right mr-3 text-sm sm:text-base">Name</div>
      </div>
      <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md">
        {departmentList.map((dl) => (
          <li
            key={dl.department_id}
            className="flex justify-between items-center px-6 py-2 text-sm sm:text-base"
          >
            <span>{dl.department_id}</span>
            <span className="flex justify-end">{dl.department_name}</span>
          </li>
        ))}
      </ul>
      <button
        className="bg-orange-400 text-lg text-black flex items-center justify-center py-2 px-4 mt-6 mx-auto rounded-full
          hover:bg-orange-600 transform hover:transition-transform hover:translate-y-1 hover:shadow-md"
        onClick={() => setIsAddDepartmentModal(true)}
      >
        Add New Department
      </button>
      {isAddDepartmentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Add New Department</h2>

            <form onSubmit={handleAddDepartmentSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="Department Name"
                  name="departmentName"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddDepartmentModal(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer /> 
    </div>
  );
};

export default AddDepartment;
