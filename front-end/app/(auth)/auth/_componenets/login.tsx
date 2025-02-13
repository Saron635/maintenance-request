'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GetServerSideProps } from 'next';
import ChatBot from '../../../../components/ChatBot';
function Login() {
  const [password, setPassword] = useState(' ');
  const [username, setUsername] = useState(' ');

  const router = useRouter();
  // Clear session or tokens on component mount
  useEffect(() => {
    // Clear auth token cookie
    // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername(''); // Clear username state
    setPassword(''); // Clear password state
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data && data.user) {
        // Store token in a cookie
        document.cookie = `authToken=${data.token}; path=/;`;
        const { role } = data.user;
        switch (role) {
          case 'Admin':
            router.push('/admin/dashboard');
            break;
          case 'Employee':
            router.push('/employee/emp_dashboard');
            break;
          case 'Department_Head':
            router.push('/department/allRequest');
            break;
          case 'Maintenance_Head':
            router.push('/dashboard/dashboardHome');
            break;
          case 'Technician':
            router.push('/technician/allHistory');
            break;
          default:
            router.push('/');
        }
      } else {
        alert('Credentials Wrong');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while trying to log in');
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <form
          className=" w-96 bg-white bg-opacity-10 backdrop-filter 
        backdrop-blur-lg  border border-opacity-30 border-white shadow-lg-white p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-950">
            Login
          </h2>

          {/*username*/}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg "
              placeholder="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/*Password*/}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/*Remeber me*/}
          {/* <div className=" flex mb-2">
            <label className="">
              <input
                type="checkbox"
                className="form-checkbox h-3 w-3 border-gray-300 rounded"
              />
              <span className="text-xs ">Remember Me</span>
            </label>
          </div> */}

          {/*button*/}

          <button
            type="submit"
            className="w-full p-2 bg-blue-950 text-white rounded-lg"
          >
            Login
          </button>

          {/*Forgot password*/}
          <div className="flex justify-center w-full p-4 text-xs text-blue-950">
            <Link href={'/auth/ForgotPassword'}>Forgot Password?</Link>
          </div>

          {/*Terms and conditions, support*/}
          {/*<div className="flex justify-center pt-2">
            <span className="text-xs text-blue-950"> Support</span>
          </div>*/}
        </form>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies['authToken'];

  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const response = await fetch('http://localhost:3002/api/auth/role', {
      headers: { Cookie: `authToken=${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch role');
    }

    const data = await response.json();
    const { role } = data;

    switch (role) {
      case 'admin':
        return {
          redirect: { destination: '/admin/dashboard', permanent: false },
        };
      case 'employee':
        return {
          redirect: {
            destination: '/employee/emp_dashboard',
            permanent: false,
          },
        };
      case 'department':
        return {
          redirect: { destination: '/department/allRequest', permanent: false },
        };
      case 'maintenance':
        return {
          redirect: {
            destination: '/dashboard/dashboardHome',
            permanent: false,
          },
        };
      case 'technician':
        return {
          redirect: { destination: '/technician/allHistory', permanent: false },
        };
      default:
        return { redirect: { destination: '/', permanent: false } };
    }
  } catch {
    return { redirect: { destination: '/auth/Home', permanent: false } };
  }
};

export default Login;
