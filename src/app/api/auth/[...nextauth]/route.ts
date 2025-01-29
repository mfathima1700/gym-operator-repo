//export {  GET,  POST } from "@/auth";

// middleware.ts //export {auth as middleware} from "@/auth"

/*
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import Github from "next-auth/providers/github";


export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
  providers: [
    // Github({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Add your authorization logic here
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
*/

import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Find the user in the database
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // Compare the provided password with the hashed password
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

// Initialize NextAuth and export handlers
const nextAuthResult = NextAuth(authOptions);

// Debugging: Log the result of NextAuth initialization
console.log("NextAuth result:", nextAuthResult);

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = nextAuthResult;



