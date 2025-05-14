import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { User } from "next-auth";

import path from "path";
import { FormStatus } from "react-dom";

type formState = {
  message: string;
  type: string;
};

const prisma = new PrismaClient();

export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) return null;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  return user;
}

export async function updateUserProfile(
  formState: any,
  formData: FormData
): Promise<formState> {
  return {message: "perfil", type: "sucess"};
}
