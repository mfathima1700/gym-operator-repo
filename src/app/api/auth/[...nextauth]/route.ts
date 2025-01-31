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
import { saltAndHashPassword } from "@/lib/bcryptHelper";
import { useReactTable } from "@tanstack/react-table";

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
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // why is this done? 
        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);
        const password = credentials.password as string;

        // Find the user in the database
        let user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // If the user doesn't exist or the password is incorrect, return null
        if (!user || !user.hashedPassword) {
          return null;
        }

        // Compare the provided password with the hashed password
        const isMatch = bcrypt.compareSync(password, user.hashedPassword);
        if (!isMatch) {
          return null;
        }

        // Return the user object if authentication is successful
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID and email to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID and email to the session
      if (token && session.user ) {
        //session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
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



