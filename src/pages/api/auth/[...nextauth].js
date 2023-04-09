import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"

import { PrismaClient } from '@prisma/client'
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
  secret: process.env.NEXTAUTH_SECRET,
});
