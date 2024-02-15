import { NextResponse } from "next/server";

export function middleware(request) {
  const CLIENT_API_KEY = request.headers.get("X-API-KEY");
  const API_KEY = process.env.API_KEY;

  if (CLIENT_API_KEY != API_KEY) {
    return NextResponse.json(
      {
        status_code: 401,
        message: "Unauthorized",
        data: null,
      },
      {
        status: 401,
      }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
