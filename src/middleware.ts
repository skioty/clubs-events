// middleware.ts (in your root directory)
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/signin", // Make sure this matches your custom page
    }
  }
)

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"] // Protected routes
}