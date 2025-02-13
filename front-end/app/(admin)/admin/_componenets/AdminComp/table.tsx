export function table() {
  return (
    <>
      <div className="mx-64 mt-8">
        {/* {isAddRequestTypeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add RequestType</h2>

              <form onSubmit={handleAddRequestTypeSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Request Type Name
                  </label>
                  <input
                    type="text"
                    placeholder="Request Type Name"
                    name="requestTypeName"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
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
        {isRemoveRequestTypeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add RequestType</h2>

              <form onSubmit={handleRemoveRequestTypeSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Request Type Name
                  </label>
                  <input
                    type="text"
                    placeholder="Request Type Name"
                    name="requestTypeName"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                  // const handleRemoveRequestTypeSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = {
  //     requestTypeName: formData.get('requestTypeName') as string,
  //   };
  //   try {
  //     const response = await fetch(
  //       'http://localhost:3002/api/requests/removeRequestType',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     if (response.ok) {
  //       alert('Request Type deleted Successfully');
  //       setIsRemoveRequestTypeModalOpen(false);
  //       window.location.reload();
  //     } else {
  //       const errorMessage = await response.text();
  //       alert(`Failed to delete Request Type: ${errorMessage}`);
  //     }
  //   } catch (err) {
  //     console.error(
  //       `Unable to send request to Server. with error message: ${err}`
  //     );
  //   }
  // };
  // const handleAddRequestTypeSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = {
  //     requestTypeName: formData.get('requestTypeName') as string,
  //   };
  //   try {
  //     const response = await fetch(
  //       'http://localhost:3002/api/requests/addRequestType',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     if (response.ok) {
  //       alert('Request Type added successfully');
  //       setIsAddRequestTypeModalOpen(false);
  //       window.location.reload();
  //     } else {
  //       const errorMessage = await response.text();
  //       alert(`Failed to add Request Type: ${errorMessage}`);
  //     }
  //   } catch (err) {
  //     console.error(
  //       `Unable to send request to Server. With error message: ${err}`
  //     );
  //   }
  // };

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
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
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="09-17-3356"
                    name="phoneNumber"
                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    name="department"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {departments.length > 0 &&
                      departments.map((department: any, index) => (
                        <option key={index} value={department}>
                          {department}
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
                    onClick={handleClose}
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
            {/* <div>
                <div
                  className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2"
                  onClick={handleRemoveRequestTypeClick}
                >
                  <div className="text-gray-200 text-center">
                    <Plus />
                  </div>
                  <div>
                    <Link href={''}>
                      <button className=" text-gray-200 items-end flex-row ">
                        Remove RequestType
                      </button>
                    </Link>
                  </div>
                </div>
              </div> */}
              {/* <div>
                <div
                  className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2"
                  onClick={handleAddRequestTypeClick}
                >
                  <div className="text-gray-200 text-center">
                    <Plus />
                  </div>
                  <div>
                    <Link href={''}>
                      <button className=" text-gray-200 items-end flex-row ">
                        Add RequestType
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2"
                  onClick={handleRemoveDepartmentClick}
                >
                  <div className="text-gray-200 text-center">
                    <Plus />
                  </div>
                  <div>
                    <Link href={''}>
                      <button className=" text-gray-200 items-end flex-row ">
                        Remove Department
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2"
                onClick={handleAddDepartmentClick}
              >
                <div className="text-gray-200 text-center">
                  <Plus />
                </div>
                <div>
                  <Link href={''}>
                    <button className=" text-gray-200 items-end flex-row ">
                      Add Department
                    </button>
                  </Link>
                </div>
              </div>
              <div
                className=" flex flex-row right-0 bg-blue-950 rounded-lg w-fit  mb-8 p-2"
                onClick={handleAddUserClick}
              >
                <div className="text-gray-200 text-center">
                  <Plus />
                </div>
                <div>
                  <Link href={''}>
                    <button className=" text-gray-200 items-end flex-row ">
                      ADD User
                    </button>
                  </Link>
                </div>
              </div> */}
          {/* </div>
      
        {isAddDepartmentModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add Department</h2>

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
                    onClick={handleClose}
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
        // )} */}

        // 
        {/* //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        //       <h2 className="text-xl font-bold mb-4">Remove Department</h2>

        //       <form onSubmit={handleRemoveDepartmentSubmit}>
        //         <div className="mb-4">
        //           <label className="block text-sm font-medium text-gray-700">
        //             Department Name
        //           </label>
        //           <input */}
        {/* //             type="text"
        //             placeholder="Department Name"
        //             name="departmentName"
        //             className="w-full p-2 border border-gray-300 rounded-lg"
        //           />
        //         </div>

        //         <div className="flex justify-end">
        //           <button
        //             type="button"
        //             onClick={handleClose}
        //             className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
        //           >
        //             Cancel
        //           </button>
        //           <button
        //             type="submit"
        //             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        //           >
        //             Submit
        //           </button> */}
        {/* //         </div>
        //       </form> */}
        {/* //     </div>
        //   </div> */}
            {/* // useEffect(() => { */}
  {/* //   handleDepartmentList();
  // }, []);

  // const handleButtonClick = (id: Number) => { */}
  {/* //   router.push(`/admin/api/item/${id}`);
  // };

  // Hnadle pop up modal
  // const handleAddDepartmentClick = () => { */}
  //   setisAddDepartmentModalOpen(true);
  // };

  // const handleRemoveDepartmentClick = () => {
  //   setisRemoveDepartmentModalOpen(true);
  // };
  // const handleAddUserClick = () => {
  //   setIsAddUserModalOpen(true);
  // };

  // const handleAddRequestTypeClick = () => {
  //   setIsAddRequestTypeModalOpen(true);
  // };
  // const handleRemoveRequestTypeClick = () => {
  //   setIsRemoveRequestTypeModalOpen(true);
  // };

  //close button modals
  // const handleClose = () => {
  //   setIsAddUserModalOpen(false);
  //   setisAddDepartmentModalOpen(false);
  //   setisRemoveDepartmentModalOpen(false);
  //   setIsAddRequestTypeModalOpen(false);
  //   setIsRemoveRequestTypeModalOpen(false);
  // };

  // const handleRemoveDepartmentSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = {
  //     departmentName: formData.get('departmentName') as string,
  //   };
  //   try {
  //     // console.log(data);
  //     const response = await fetch(
  //       'http://localhost:3002/api/registers/removeDepartment',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (response.ok) {
  //       alert('Department deleted successfully');
  //       // Refresh the page after the alert
  //       window.location.reload();
  //       setisRemoveDepartmentModalOpen(false);
  //     } else {
  //       const errorMessage = await response.text();
  //       alert('Department deletion failed' + errorMessage);
  //     }
  //   } catch (e) {
  //     console.error(`Server: ` + e);
  //   }
  // };

  // const handleAddDepartmentSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const data = {
  //     departmentName: formData.get('departmentName') as string,
  //   };
  //   try {
  //     // console.log(data);
  //     const response = await fetch(
  //       'http://localhost:3002/api/registers/departments',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (response.ok) {
  //       alert('Department registration successfully');
  //       setisAddDepartmentModalOpen(false);
  //       // Refresh the page after the alert
  //       window.location.reload();
  //     } else {
  //       const errorMessage = await response.text();
  //       alert('Department registration failed' + errorMessage);
  //     }
  //   } catch (e) {
  //     console.error(`Server: ` + e);
  //   }
  // };

  // const handleAddUserSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);

  //   const data = {
  //     username: formData.get('username') as string,
  //     email: formData.get('email') as string,
  //     department: formData.get('department') as string,
  //     password: formData.get('password') as string,
  //     role: formData.get('role') as string,
  //     phoneNumber: formData.get('phoneNumber') as string,
  //   };

  //   try {
  //     console.log(data);
  //     const response = await fetch(
  //       'http://localhost:3002/api/registers/users',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (response.ok) {
  //       alert('user registration successful');
  //       setIsAddUserModalOpen(false);
  //       // Refresh the page after the alert
  //       window.location.reload();
  //     } else {
  //       const errorMessage = await response.text();
  //       alert('User registra{ data }tion failed' + errorMessage);
  //     }
  //   } catch (err) {
  //     console.error(`Error: ` + err);
  //   }
  // };

  // const handleDepartmentList = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://localhost:3002/api/registers/getDepartments',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     // console.log(data);
  //     if (response.ok && Array.isArray(data)) {
  //       // Map the data to extract only department_name
  //       const departmentNames: String[] = data.map(
  //         (department: any) => department.department_name
  //       );
  //       setDepartments(departmentNames);
  //       // // Refresh the page after the alert
  //       // window.location.reload();
  //     } else {
  //       console.error(`Fetching department error: ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.error(`Fetching  error: ${err}`);
  //   }
  // };
  //       )} */}

  //       <h2 className="font-bold text-2xl mb-6 text-center">
  //         Remove Department
  //       </h2>
  //       <div className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-t-lg flex justify-between">
  //         <div className="w-1/4">ID</div>
  //         <div className="w-1/2 text-center">Name</div>
  //         <div className="w-1/4 text-right mr-4">Action</div>
  //       </div>
  //       <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md">
  //         {/* {departmentList.map((dl) => ( */}
  //         <li
  //           // key={dl.department_id}
  //           className="flex flex-between items-center py-3 px-6"
  //         >
  //           {/* <div className="w-1/4 font-mono">{dl.department_id}</div> */}
  //           {/* <div className="w-1/2 text-center"> {dl.department_name}</div> */}
  //           <div className="w-1/4 text-right">
  //             <button
  //               className="text-black  bg-red-400 rounded-full transform hover:transition-transform hover:translate-y-1 
  //               hover:shadow-lg py-2 px-4"
  //               // onClick={() => handleDelete(dl.department_id)}
  //             >
  //               Remove
  //             </button>
  //           </div>
  //         </li>
  //         {/* ))} */}
  //       </ul>
  //     </div>
  //   </>
  // );
}

export default table;
