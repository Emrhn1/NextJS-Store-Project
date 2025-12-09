// proxy.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/', '/about', '/products(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const isAdminUser = session.userId === process.env.ADMIN_USER_ID
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (isPublicRoute(req)) return;



  if (!session.userId) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};

