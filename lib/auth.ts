import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export { SESSION_COOKIE } from "@/lib/session";

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== Role.ADMIN) {
    redirect("/login?next=/admin");
  }

  return user;
}
