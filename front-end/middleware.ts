import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define an interface for the decoded token
interface DecodedToken {
  userId: string;
  username: string;
  departementId: string;
  role: string;
}

// Secret used for JWT signing and verification
const secret = new TextEncoder().encode(
  process.env.JWT_KEY || 'It-is-unbreakable'
);

export async function middleware(request: NextRequest) {
  // Get the 'authToken' cookie
  const authToken = request.cookies.get('authToken')?.value;

  // If no token is found, redirect to the "Not Allowed" page
  if (!authToken) {
    return NextResponse.redirect(new URL('/not-allowed', request.url));
  }

  try {
    // Verify the token and decode it
    const { payload } = await jwtVerify(authToken, secret);
    const decodedToken = payload as DecodedToken;

    // Check the user's role and the requested path
    const { role } = decodedToken;
    const urlPath = request.nextUrl.pathname;

    if (
      (role === 'Employee' && !urlPath.startsWith('/employee')) ||
      (role === 'Maintenance_Head' && !urlPath.startsWith('/dashboard')) ||
      (role === 'Department_Head' && !urlPath.startsWith('/department')) ||
      (role === 'Technician' && !urlPath.startsWith('/technician'))
      ||
       (role === 'Admin' && !urlPath.startsWith('/admin'))
    ) {
      return NextResponse.redirect(new URL('/not-allowed', request.url));
    }

    // If the role matches the path, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to the "Not Allowed" page
    return NextResponse.redirect(new URL('/not-allowed', request.url));
  }
}

// Specify the paths that require authentication
export const config = {
  matcher: [
    '/department/:path*',
    '/employee/:path*',
    '/technician/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
  ],
};
