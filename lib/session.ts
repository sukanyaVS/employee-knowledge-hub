import { jwtVerify, SignJWT } from "jose";
import { Role } from "@/app/generated/prisma/enums";

export const SESSION_COOKIE = "employee_hub_session";

export type SessionPayload = {
  userId: number;
  role: Role;
};

function getSecret() {
  const secret =
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "employee-knowledge-hub-development-secret"
      : undefined);

  if (!secret) {
    throw new Error("AUTH_SECRET must be configured");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const userId = Number(payload.userId);
    const role = payload.role;

    if (!Number.isInteger(userId) || (role !== Role.ADMIN && role !== Role.EMPLOYEE)) {
      return null;
    }

    return { userId, role };
  } catch {
    return null;
  }
}
