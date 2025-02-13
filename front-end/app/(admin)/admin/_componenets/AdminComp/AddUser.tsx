'use Client';
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUser = () => {
  //useState
  const [userLists, setUsersLists] = useState<any[]>([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [sortUserList, setSortedUserList] = useState(userLists);
  const [sortedBy, setSortBy] = useState('username');
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

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
      .get('http://localhost:3002/api/registers/getUsersList')
      .then((response) => setUsersLists(response.data))
      .catch((error) => {
        toast.error(`There was an error fetching the users list!, ${error}`);
        window.location.reload();
      });

    axios
      .get('http://localhost:3002/api/registers/getDepartments')
      .then((response) => setDepartments(response.data))
      .catch((error) => {
        toast.error(
          `There was an error fetching the departments list!, ${error}`
        );
        window.location.reload();
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
        window.location.reload();
        // Refresh the page after the alert
        window.location.reload();
      } else {
        toast.error('Failed to update status');
        window.location.reload();
      }
    } catch (err) {
      // console.error(`Fetching error: ${err}`);
      toast.error(`Failed to update: ${err}`);
      window.location.reload();
    }
  };

  const handleAddUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const userData: any = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      phoneNumber: formData.get('phone_number') as string,
      role: formData.get('role') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    await axios
      .post('http://localhost:3002/api/registers/users', userData)
      .then((response) => toast.success('User registrated successfully'))
      .catch((error) =>
        toast.error('User registration failed with error message' + error)
      );
    window.location.reload();
    setIsAddUserModalOpen(false);
  };

  const handleUpdateUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const updatedUserData: any = {
      user_id: selectedUser?.user_id,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      departmentName: formData.get('department') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      role: formData.get('role') as string,
    };

    await axios
      .put(
        `http://localhost:3002/api/registers/updateUser/${selectedUser?.user_id}`,
        updatedUserData
      )
      .then((response) => {
        toast.success('User updated successfully');
        window.location.reload();
        setIsUpdateUserModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <ToastContainer />
      {isUpdateUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User</h2>

            <form onSubmit={handleUpdateUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={selectedUser?.username || ''}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser?.email || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={selectedUser?.phone_number || ''}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phone_number: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={selectedUser?.department_name || ''}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      department_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {departments.map((department) => (
                    <option
                      key={department.id}
                      value={department.department_name}
                    >
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={selectedUser?.role || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Admin">Administrator</option>
                  <option value="Employee">Employee</option>
                  <option value="Department_Head">Department Head</option>
                  <option value="Maintenance_Head">Maintenance Head</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsUpdateUserModalOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add User</h2>

            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="some@gmail.com"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 w-full"
                  name="phone_number"
                  placeholder="enter your phone number"
                  required
                  defaultValue="+251"
                  pattern="\+251[0-9]{9}"
                  maxLength="13"
                  onInput={(e) => {
                    if (!e.target.value.startsWith('+251')) {
                      e.target.value = '+251';
                    }
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  name="confirmPassword"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  {departments.length > 0 &&
                    departments.map((department: any, index: any) => (
                      <option key={index} value={department.department_name}>
                        {department.department_name}
                      </option>
                    ))}
                  ;
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Role
                </label>
                <select
                  name="role"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="Admin">Administrator</option>
                  <option value="Employee">Employee</option>
                  <option value="Department_Head">Department Head</option>
                  <option value="Maintenance_Head">Maintenance Head</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
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
      <div className="mx-80 w-3/4">
        <div className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2">
          <select
            value={sortedBy}
            onChange={handleSort}
            className="text-center text-white bg-black"
          >
            <option value="username">Sort by Username</option>
            <option value="department">Sort by Department</option>
            <option value="role">Sort by Role</option>
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
          <div className="w-1/12">Action</div>
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
              <span className="w-1/12">
                <button
                  className="inline-block px-2 py-1 text-xs font-semibold rounded-full 
                     hover:shadow-lg transform hover:transition-transform hover:translate-y-1 
                         bg-green-200 text-green-800"
                  onClick={() => {
                    setSelectedUser(ul);
                    setIsUpdateUserModalOpen(true);
                  }}
                >
                  update
                </button>
              </span>
            </li>
          ))}
        </ul>

        <button
          className="bg-orange-400 text-lg text-black justify-center py-2 px-4 m-6 rounded-full
           hover:bg-orange-600 transform hover:transition-transform hover:translate-y-1 hover:shadow-md"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          + Add User
        </button>
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

export default AddUser;
