import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth"

import google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const config = {
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    providers: [google],
} satisfies NextAuthConfig


export const { handlers, auth, signIn, signOut } = NextAuth(config)
