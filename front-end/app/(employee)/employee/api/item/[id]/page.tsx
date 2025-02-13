'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/app/(employee)/employee/_componenets/EmpComp/navbar';
import { Sidebar } from '@/app/(employee)/employee/_componenets/EmpComp/sidebar';

export default function AssignedCompleted() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Extracting the ID from the URL path
    const currentUrl = window.location.pathname;
    const idFromUrl = currentUrl.split('/').pop() || null; // Ensure it's a string or null
    setId(idFromUrl);
  }, []);

  useEffect(() => {
    if (id) {
      console.log('Fetching data for ID:', id);
      fetch(`http://localhost:3002/api/search/searchProblems/${id}`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data fetched successfully:', data);
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          setError('Failed to load data.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!data) return <p>No data found.</p>;

  // Extract the YouTube video ID from the URL
  const extractYouTubeID = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)|youtu\.be\/([^?&]+)/
    );
    return videoIdMatch ? videoIdMatch[1] || videoIdMatch[2] : null;
  };

  const videoId = data.video_url ? extractYouTubeID(data.video_url) : null;

  // Ensure description is an object/array and not a string
  const descriptionSteps = Array.isArray(data.description) ? data.description : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full top-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed top-0 inset-y-0 z-40 ml-4">
        <Sidebar />
      </div>
      <main className="pt-[100px] md:pl-60">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
          <div className="mb-4">
            {videoId ? (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <p>No video available</p>
            )}
          </div>

          {/* Display description steps */}
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">Steps:</h2>
            <ul className="list-decimal list-inside">
              {descriptionSteps.map((step: any, index: number) => (
                <li key={index} className="mb-2">
                  {step.texts}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
