import crypto from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "ziad-habiba-forever-love-secret-key-2025";
const COOKIE_NAME = "hz_love_session";

export interface SessionData {
  authenticated: boolean;
  user: string;
  issuedAt: number;
  expiresAt: number;
}

export function createSessionToken(user = "Habiba"): string {
  const payload: SessionData = {
    authenticated: true,
    user,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("base64url");

  return `${payloadString}.${signature}`;
}

export function verifySessionToken(token?: string | null): SessionData | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadString, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload: SessionData = JSON.parse(
      Buffer.from(payloadString, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
