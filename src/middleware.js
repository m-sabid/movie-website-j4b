import { NextResponse } from "next/server";

export function middleware(request) {
  // Get token and role from cookies
  const token = request.cookies.get("token");
  const userRole = request.cookies.get("userRole");

  // If no token or no role, redirect to login
  if (!token || !userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the role is "admin"
  if (userRole.value === "admin") {
    // Allow access for admin users
    return NextResponse.next();
  } else {
    // Redirect non-admin users
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",  // Match the /dashboard routes
};
