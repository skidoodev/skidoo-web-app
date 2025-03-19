import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Match all paths except static files and _next
//     "/((?!.+\\.[\\w]+$|_next).*)",
//     // Match root path
//     "/",
//     // Match all API routes
//     "/api/:path*",
//     // Match all trpc routes
//     "/trpc/:path*",
//     // Explicitly match the generate-itinerary API route
//     "/api/generate-itinerary",
//   ],
//};
