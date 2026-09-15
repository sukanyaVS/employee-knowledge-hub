import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/generated/prisma/enums";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

const mutationMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isArticleMutation =
    request.nextUrl.pathname.startsWith("/api/articles") &&
    mutationMethods.has(request.method);

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (session && (!isAdminPage || session.role === Role.ADMIN)) {
    return NextResponse.next();
  }

  if (isArticleMutation) {
    return NextResponse.json(
      { message: "Admin authentication required" },
      { status: session ? 403 : 401 }
    );
  }

  if (isAdminPage && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    "/api/articles/:path*",
  ],
};
