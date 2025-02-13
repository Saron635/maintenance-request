// front-end/app/not-allowed.tsx

import { FC } from 'react';
import Link from 'next/link';

const NotAllowed: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">You do not have permission to access this page.</p>
      <Link href="/auth/Home" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  );
};

export default NotAllowed;
