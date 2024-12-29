import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// Create a new blog
export async function POST(req: Request) {
  try {
    const { name, image, stack, details } = await req.json();

    if (!name || !details) {
      return NextResponse.json(
        { error: "Name,  and details are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newBlog = await Blog.create({
      name,
      image,
      stack,
      details,
    });

    return NextResponse.json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

// Fetch all blogs
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
