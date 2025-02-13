'use client';

import {
  BarChart,
  CheckSquare,
  CheckSquare2,
  Compass,
  FileText,
  Layout,
  LogOut,
  MessageCircle,
  Settings,
  Users,
} from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // use this in the new App Router structure

interface DecodedToken {
  userId: string;
  username: string;
  role: string;
  exp: number;
}

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/dashboard/dashboardHome',
  },
  {
    icon: Compass,
    label: 'Assign',
    href: '/dashboard/assign',
  },
  {
    icon: CheckSquare,
    label: 'Completed',
    href: '/dashboard/completed',
  },
  // {
  //   icon: BarChart,
  //   label: 'Analysis',
  //   href: '/dashboard/analysis_Table',
  // },
  // {
  //   icon: MessageCircle,
  //   label: 'Chatting',
  //   href: '/dashboard/chatting',
  // },
  // {
  //   icon: Settings,
  //   label: 'Settings',
  //   href: '/dashboard/settings',
  // },
  // {
  //   icon: Users,
  //   label: 'Feedback',
  //   href: '/dashboard/employee_feedback',
  // },
  //   {
  //     icon: LogOut,
  //     label: 'Logout',
  //     href: '/auth/Home',
  //   },
];

export const SidebarRoutes = () => {
  const [employeeName, setEmployeeName] = useState('');
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
      {guestRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

      {/* <div
        className="transform hover:transition-transform hover:translate-y-1 mt-5 flex items-center gap-x-2 font-[500] text-sm pl-6 transition-all bg-blue-500 px-6 py-3 rounded-lg text-white hover:shadow-lg m-4 cursor-pointer"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </div> */}

      <div className="mt-5 flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20">
        <Image height={40} width={40} alt="logo" src="/avatar.png" />
        <div className="flex justify-center items-center">
          <h5>Hey, {employeeName || 'Guest'}</h5>
        </div>
      </div>
    </div>
  );
};
