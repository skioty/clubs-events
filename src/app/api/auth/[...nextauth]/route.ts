// src/app/api/auth/[...nextauth]/route.ts 
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth-config";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
