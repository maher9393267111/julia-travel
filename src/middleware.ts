// file used to create middleware for the application
// every request will go through this file

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  try {
    {
      const token = request.cookies.get("token")?.value;
      const { pathname } = request.nextUrl;
      // const decodedToken: any = jwt.verify(token, process.env.jwt_secret || "");
      //  const userId = decodedToken;

      //   console.log(token , "toKEN  🙄  🙄  🙄  🙄NNN" ,userId)
      const isAuthPage =
        pathname === "/auth/login" || pathname === "/auth/register";

      //       if (request.nextUrl.pathname.startsWith("/admin")) {
      //         console.log('start admin' )
      //         if (!token) {
      //           console.log('stert admin no token')
      //           return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      //         }

      //         if (token ){
      // console.log('stert admin and token var' )
      // console.log('ROLE???????????' )

      // const decodedToken: any = jwt.verify(token, process.env.jwt_secret || "");
      // const userId = decodedToken._id;
      //   console.log('ROLE??????????22222222222?' )
      //         if (userId !== 'a'){

      //           return NextResponse.redirect(new URL("/", request.url));

      //         }
      //       }

      //         return NextResponse.next();
      //       }

      if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (!isAuthPage && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      return NextResponse.next();
    }
  } catch (error) {
    const response = NextResponse.next();
     response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/login",
    "/auth/register",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
