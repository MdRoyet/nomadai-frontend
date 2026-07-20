import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("nomadai_token")?.value;
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/items/add", "/items/manage", "/dashboard", "/booking", "/favorites", "/itinerary"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    // Redirect to login if trying to access protected route without token
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/items/:path*", "/dashboard/:path*", "/booking/:path*", "/favorites/:path*", "/itinerary/:path*"],
};
