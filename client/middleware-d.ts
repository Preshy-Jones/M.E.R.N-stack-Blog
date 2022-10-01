// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export function middleware(request: NextRequest) {
  const { cookies, url } = request;
  const { pathname, origin } = request.nextUrl;
  //console.log(pathname);

  // const accessToken = localStorage.getItem("accessToken");
  // console.log("hello");

  const refreshToken = cookies.get("jwt");

  //  console.log(refreshToken);

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (refreshToken) {
      return NextResponse.redirect(`${origin}`);
      // try {
      //   const decodedAccessToken = jwt.verify(
      //     refreshToken as string,
      //     refreshTokenSecret as string
      //   );

      //   return NextResponse.redirect(`${origin}`);
      // } catch (error) {
      //   return NextResponse.next();
      // }
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (refreshToken == undefined) {
      return NextResponse.redirect(`${origin}/login`);
    } else {
      return NextResponse.next();
    }

    // try {
    //   const decodedAccessToken = jwt.verify(
    //     refreshToken as string,
    //     refreshTokenSecret as string
    //   );

    //   return NextResponse.next();
    // } catch (error) {
    //   console.log(error);

    //   console.log("hello");
    //   console.log(origin);
    //   return NextResponse.redirect(`${origin}/login`);
    // }
    // const decodedRefreshToken = jwt.verify(
    //   refreshToken,
    //   refreshTokenSecret as string
    // );

    // if (decodedAccessToken && decodedRefreshToken) {
    //   return NextResponse.next();
    // }
  }

  return NextResponse.next();
}
