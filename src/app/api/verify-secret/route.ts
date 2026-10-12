import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, COOKIE_NAME } from "@/lib/auth";
import { COUPLE_CONFIG } from "@/config/content";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawWord = body?.secretWord || "";

    const normalized = rawWord.trim().toLowerCase();
    const targetWord = (process.env.SECRET_WORD || COUPLE_CONFIG.secretGate.secretWord).trim().toLowerCase();

    if (normalized !== targetWord) {
      return NextResponse.json(
        {
          success: false,
          error: COUPLE_CONFIG.secretGate.errorMessage,
        },
        { status: 401 }
      );
    }

    const token = createSessionToken(COUPLE_CONFIG.he);

    const response = NextResponse.json({
      success: true,
      message: "تم التحقق بنجاح ❤️",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع، يرجى المحاولة ثانية" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { verifySessionToken } = await import("@/lib/auth");
  const session = verifySessionToken(token);

  return NextResponse.json({
    authenticated: Boolean(session),
    user: session?.user || null,
  });
}
