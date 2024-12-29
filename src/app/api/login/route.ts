import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User"; // MongoDB User model
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET || "nusratparvin";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase(); // Connect to MongoDB

    // Check if the user exists
    const user = await User.findOne({ username });

    // if (!user) {
    //   // First-time user insertion (uncomment below section when adding new users for the first time)

    //   user = new User({ username, password });
    //   await user.save(); // Save user to DB
    //   // End of user insertion logic

    //   // Set authentication cookie
    //   const headers = new Headers();
    //   headers.set(
    //     "Set-Cookie",
    //     "isAuthenticated=true; Path=/; HttpOnly; Max-Age=3600"
    //   ); // 1 hour expiration
    //   return NextResponse.json(
    //     { message: "User created and logged in successfully" },
    //     { status: 201, headers }
    //   );
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const headers = new Headers();
    headers.set("Set-Cookie", `token=${token}; Path=/; HttpOnly; Max-Age=3600`);

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200, headers }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method is not allowed for /api/login" },
    { status: 405 }
  );
}
