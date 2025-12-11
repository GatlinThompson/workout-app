import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { username, password } = await request.json();

    const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await timeout(1000); // Simulate network delay
    // Dummy authentication logic
    if (username === "admin" && password === "password") {
      return NextResponse.json(
        { message: "Login successful", authenticated: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid credentials", authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed due to server error" },
      { status: 500 }
    );
  }
}
