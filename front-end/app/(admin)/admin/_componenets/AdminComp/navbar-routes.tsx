import { usePathname } from "next/navigation";
import Link from 'next/link'; // Correct import for Link in Next.js
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import {  LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop(); // Remove leading slash
  const router = useRouter();

  const [employeeName, setEmployeeName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ');
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith('authToken=')
      );
      return authTokenCookie ? authTokenCookie.split('=')[1] : null;
    };

    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      setEmployeeName(decodedToken.username);
      setRole(decodedToken.role);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    if (typeof window !== 'undefined') {
      router.push('/auth/Home');
    }
  };

  return (
    <div className="flex justify-end items-center w-full space-x-8">
      <div className="flex space-x-4 ">
        <Link href="/admin/settings">
          <Settings className="w-8 h-8 font-bold text-gray-800  hover:text-blue-500 transition-colors cursor-pointer" />
        </Link>
        <Link href="/auth/Home">
        <LogOut 
          className="w-8 h-8 font-bold text-gray-800  hover:text-blue-500 transition-colors cursor-pointer"
          onClick={handleLogout} 
        />
        </Link>
       
      </div>
    </div>
  );
};
