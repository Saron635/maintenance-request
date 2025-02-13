'use client';

import {
  BarChart,
  CheckSquare,
  CheckSquare2,
  Compass,
  ShieldMinus,
  ShieldCheck,
  FileText,
  Layout,
  LogOut,
  MessageCircle,
  Settings,
  Users,
} from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface DecodedToken {
  userId: string;
  username: string;
  role: string;
  exp: number; // token expiration time, if present
}

const guestRoutes = [
  {
    icon: ShieldCheck,
    label: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    icon: ShieldMinus,
    label: 'Deactivated User',
    href: '/admin/Deactivated',
  },

  // {
  //   icon: Settings,
  //   label: 'Settings',
  //   href: '/admin/settings',
  // },
];

export const SidebarRoutes = () => {
  const routes = guestRoutes;
  const [employeeName, setEmployeeName] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

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
      // Assert that the decoded token is of type DecodedToken
      const decodedToken = jwtDecode(token) as DecodedToken;
      setEmployeeName(decodedToken.username);
      setRole(decodedToken.role);
    }
  }, []);

  const handleLogout = () => {
    // Clear the authToken cookie by setting it to expire in the past
    document.cookie =
      'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      router.push('/auth/Home');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

      {/* <div
        className="mt-5 flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20 cursor-pointer"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </div> */}

      <div className="mt-5 flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20">
        <Image height={40} width={40} alt="logo" src="/avatar.png" />
        <div className=" items-center">
          <h5> Hey {employeeName} </h5>
          <p>
            <strong>{role}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
