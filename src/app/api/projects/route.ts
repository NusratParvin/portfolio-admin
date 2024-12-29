import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Project from "@/models/Project";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request) {
  try {
    // Parse the request body
    const {
      name,
      image,
      techs,
      liveSite,
      githubClient,
      githubBackend,
      summary,
      description,
    } = await req.json();

    console.log(
      name,
      image,
      techs,
      liveSite,
      githubClient,
      githubBackend,
      summary,
      description
    );

    // Connect to the database
    await connectToDatabase();

    // Create the project entry
    const result = await Project.create({
      name,
      image,
      techs,
      liveSite,
      githubClient,
      githubBackend,
      summary,
      description,
    });

    console.log(result);

    // Return a success response
    return NextResponse.json({
      message: "Project created successfully",
      result,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find(); // Fetch all projects
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
