"use client";

import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
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
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";

const guestRoutes = [
  {
    icon: Layout,
    label: "All History",
    href: "/technician/allHistory",
  },
  {
    icon: Compass,
    label: "Work Load",
    href: "/technician/work_Load",
  },
  {
    icon: CheckSquare,
    label: "Completed",
    href: "/technician/completed",
  },
  {
    icon: MessageCircle,
    label: "Chatting",
    href: "/technician/chatting",
  },
  // {
  //   icon: Settings,
  //   label: "Settings",
  //   href: "/technician/settings",
  // },
  // {
  //   icon: LogOut,
  //   label: "Logout",
  //   href: "/auth/Home",
  // },
];

export const SidebarRoutes = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Function to get token from cookies
    const getTokenFromCookies = () => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );
      return authTokenCookie ? authTokenCookie.split("=")[1] : null;
    };

    // Decode the token to extract the username
    const token = getTokenFromCookies();
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const routes = guestRoutes;

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

      <div className="mt-5 flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20">
        <Image height={40} width={40} alt="logo" src="/avatar.png" />
        <div className="flex justify-center items-center">
          <h5>Hey, {username || 'Loading...'}</h5>
        </div>
      </div>
    </div>
  );
};
