import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./lib/verifyToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("Token from Cookie:", token);

  if (!token) {
    console.log("Token is missing");

    // Redirect to the home page (or any other page you prefer)
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = decodeToken(token);
    // console.log("Decoded Token:", decoded); // Log the decoded token to see its structure

    // Check if the token contains the required properties
    if (decoded && decoded.userId && decoded.username) {
      // console.log(
      //   "Token is valid. User ID:",
      //   decoded.userId,
      //   "Username:",
      //   decoded.username
      // );

      return NextResponse.next();
    } else {
      // console.log("Decoded token is invalid or missing user information");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/admin/:page*"], // Routes to which this middleware will apply
};
