"use client";
import { usePathname } from "next/navigation";
import { searchResults } from "../../data";
import { useState } from "react";

const SearchDetail = () => {
  const pathname = usePathname();
  const idString = pathname.split("/").pop();

  if (!idString) return <p>Request Not Found.</p>;

  const id = parseInt(idString, 10);

  const request = searchResults.find((req) => req.id === id);

  if (!request) {
    return <p>Search Not Found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{request.title}</h1>
        <p>{request.Description}</p>
      </div>
    </div>
  );
};

export default SearchDetail;
