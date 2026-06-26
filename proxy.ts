import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === "/success" && url.searchParams.has("_ptxn")) {
    return NextResponse.redirect(new URL("/success", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/success"],
};
