// File: src/app/api/nebula/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, stream = false, session_id,  type } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const thirdwebRes = await fetch("https://nebula-api.thirdweb.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": process.env.THIRDWEB_SECRET_KEY || "",
      },
      body: JSON.stringify({ message, stream, session_id,  type }),
    });

    const text = await thirdwebRes.text();

    if (!thirdwebRes.ok) {
      return new NextResponse(text, { status: thirdwebRes.status });
    }

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch (e) {
      return new NextResponse(text, { status: thirdwebRes.status });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to handle request",
        details: (error as any)?.message || error,
      },
      { status: 500 }
    );
  }
}
