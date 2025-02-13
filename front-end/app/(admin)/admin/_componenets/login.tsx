import React from 'react'
import Link from 'next/link'
function Login() {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <form className=" w-96 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg  border border-opacity-30 border-white shadow-lg-white p-6 rounded-lg   ">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-950">Login</h2>
       
        {/*Email*/}
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg " placeholder="name@gmail.com"type="email" id="email" />
        </div>

         {/*Password*/}
         <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-700" >Password</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="password"
              id="password"
            />
        </div>

            {/* Department */}
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Department</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                id="department"
              >
                <option value="software">Software Department</option>
                <option value="hr">HR Department</option>
                <option value="maintenance">Maintenance Department</option>
                <option value="sales">Sales Department</option>
                <option value="admin">Admin</option>
              </select>
            </div>


         {/*Remeber me*/}
        <div className=' flex mb-2' >
          <label className="">
            <input type="checkbox" className="form-checkbox h-3 w-3 border-gray-300 rounded"/>
            <span className="text-xs ">Remember Me</span>
          </label>
        </div>

         {/*button*/}
         <Link href={'/admin'}><button className="w-full p-2 bg-blue-950 text-white rounded-lg">Login</button></Link>
        


        {/*Forgot password*/}
        <div className='flex justify-center w-full p-4 text-xs text-blue-950'>
          <Link href={'/ForgotPassword'}>
             Forgot Password?
          </Link>
        </div>


        {/*Terms and conditions, support*/}
        <div className='flex justify-evenly pt-2'>
            <span className="text-xs text-blue-950">Terms & Conditions</span>
            <span className="text-xs text-blue-950"> Support</span>
       
        </div>

      </form>
    </div>
    </>
  
  )
}

export default Login
