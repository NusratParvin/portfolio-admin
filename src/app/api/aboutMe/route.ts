import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import AboutMe from "@/models/AboutMe";

export async function POST(req: NextRequest) {
  const { aboutMe, techs, education, work, strengths } = await req.json(); // Fetch the body as JSON
  console.log(aboutMe, techs, education, work, strengths, "route");
  try {
    await connectToDatabase();
    // Save the data to MongoDB
    const result = await AboutMe.create({
      aboutMe,
      techs,
      education,
      work,
      strengths,
    });
    console.log(result);
    return NextResponse.json({ message: "About Me section created", result });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create About Me section" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const aboutMeData = await AboutMe.findOne();

    if (!aboutMeData) {
      return NextResponse.json(
        { message: "No About Me data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutMeData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch About Me data" },
      { status: 500 }
    );
  }
}

// PUT Handler: Update or Upsert the About Me section data
export async function PUT(req: NextRequest) {
  const { aboutMe, techs, education, work, strengths } = await req.json(); // Extract the request data

  try {
    await connectToDatabase();

    // Upsert the data: Update if it exists, or create a new document if not
    const result = await AboutMe.updateOne(
      {}, // Empty filter to update the first document
      {
        $set: {
          aboutMe,
          techs,
          education,
          work,
          strengths,
          updatedAt: new Date(),
        },
      },
      { upsert: true } // This ensures that if no document is found, a new one is created
    );

    return NextResponse.json({ message: "About Me section updated", result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update About Me section" },
      { status: 500 }
    );
  }
}
