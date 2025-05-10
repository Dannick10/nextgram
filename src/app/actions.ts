import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { User } from "next-auth";

import path from "path"

const prisma = new PrismaClient()


export async function getUserByEmail(email:string | null): Promise<User | null> {
    if(!email) return null 

    const user = await prisma.user.findFirst({
        where: {email: email}
    })

    return user
}