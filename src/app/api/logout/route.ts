import { NextResponse } from "next/server";

export async function POST() {
  const headers = new Headers();
  console.log("del");
  // Clear the token cookie by setting Max-Age to 0 (expires the cookie immediately)
  headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
  );

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200, headers }
  );
}
