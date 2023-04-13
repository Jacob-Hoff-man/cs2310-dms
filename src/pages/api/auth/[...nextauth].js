import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"

import prisma from '../../../../prisma/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
      // GithubProvider({
      //   clientId: process.env.GITHUB_CLIENT_ID,
      //   clientSecret: process.env.GITHUB_CLIENT_SECRET
      // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    //...add more providers here
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
        user && (token.user = user)
        return token
    },
    async session({session, token, user}) {
        session = {
            ...session,
            user: {
                id: user.id,
                ...session.user
            }
        }
        return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
