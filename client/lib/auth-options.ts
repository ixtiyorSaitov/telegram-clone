import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongoose";
import User from '@/models/user.model'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
      },
      async authorize(credentials) {
        await connectToDatabase()
        const user = await User.findOne({ email: credentials?.email });
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {signIn: '/auth', signOut: '/auth'}
};
