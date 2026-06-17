import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";

// POST /api/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.status !== "active") {
      return NextResponse.json(
        {
          status: false,
          message: "Account is not active. Please contact support.",
        },
        { status: 403 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      status: true,
      message: "Login successful",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Auth error:", error);

    return NextResponse.json(
      { status: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}

// PUT /api/auth - Register new customer
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = body.phone || null;
    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { status: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const customerRole = await db.role.findUnique({
      where: { roleName: "customer" },
    });

    if (!customerRole) {
      return NextResponse.json(
        {
          status: false,
          message: "Customer role not found. Please seed the database first.",
        },
        { status: 500 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        roleId: customerRole.id,
        status: "active",
        emailVerified: false,
      },
      include: { role: true },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        status: true,
        message: "Registration successful",
        data: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { status: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}