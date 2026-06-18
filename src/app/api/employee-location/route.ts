import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { employeeId, latitude, longitude } = body;

    if (!employeeId || !latitude || !longitude) {
      return NextResponse.json(
        { error: "Employee ID, latitude and longitude are required" },
        { status: 400 }
      );
    }

    const location = await prisma.employeeLocation.create({
      data: {
        employeeId,
        latitude,
        longitude,
        
      },
    });

    return NextResponse.json({
      success: true,
      location,
    });
  } catch (error) {
    console.error("Location Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save employee location" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const locations = await prisma.employeeLocation.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: 100,
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Location Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}