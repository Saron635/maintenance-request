"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  BarChart,
  CheckSquare,
  Hourglass,
  XSquare,
  Search,
  ClipboardList,
  LogOut,
  Settings,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation

const guestRoutes = [
  {
    icon: Hourglass,
    label: "In progress",
    href: "/department/pending",
  },
  {
    icon: CheckSquare,
    label: "Accepted",
    href: "/department/accepted",
  },
  {
    icon: XSquare,
    label: "Rejected",
    href: "/department/rejected",
  },
  {
    icon: ClipboardList,
    label: "All Request",
    href: "/department/allRequest",
  },
  // {
  //   icon: BarChart,
  //   label: "Analysis",
  //   href: "/department/analysis",
  // },
  {
    icon: Search,
    label: "Problem Search",
    href: "/department/problem_search",
  },
 
];

export const SidebarRoutes = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );
      return authTokenCookie ? authTokenCookie.split("=")[1] : null;
    };

    const fetchDepartmentName = async (departmentId: string) => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/requests/department/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDepartmentName(data.name);
        } else {
          setDepartmentName("Unknown Department");
        }
      } catch (error) {
        setDepartmentName("Unknown Department");
      }
    };

    const token = getTokenFromCookies();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      setEmployeeName(decodedToken.username);
      setRole(decodedToken.role);
      fetchDepartmentName(decodedToken.departementId);
    }
  }, []);

  const handleLogout = () => {
    // Clear the authToken cookie by setting it to expire in the past
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to the home page
    router.push("/auth/Home");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mt-5 flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20">
        <Image height={40} width={40} alt="logo" src="/avatar.png" />
        <div className="flex flex-col">
          <h5>Hey, {employeeName || "Guest"}</h5>
          <h6>
            <strong>{departmentName || "Unknown Department"}</strong>
          </h6>
          <strong>{role || "Role"}</strong>
        </div>
      </div>
      {guestRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

     
    </div>
  );
};
