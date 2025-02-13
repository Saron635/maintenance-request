"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`flex items-center p-2 text-lg font-medium transition-colors duration-200 hover:bg-slate-300 rounded-md"
      ${pathname === item.path} ? "bg-slate-300" : ""`}
    >
      <span className="mr-4">{item.icon}</span>
      {item.title}
    </Link>
  );
};

export default MenuLink;
