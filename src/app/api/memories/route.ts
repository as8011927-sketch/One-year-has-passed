import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { COUPLE_CONFIG } from "@/config/content";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Private content protected." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    memories: COUPLE_CONFIG.memories,
    messages: COUPLE_CONFIG.messages,
    milestones: COUPLE_CONFIG.milestones,
  });
}
