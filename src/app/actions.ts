"use server";

import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { auth } from "auth";

import { User } from "next-auth";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import { FormStatus } from "react-dom";
import { revalidatePath } from "next/cache";
import { storagedImage } from "./utils/storaggedImage";

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
  const session = await auth();
  if (!session) redirect("/");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  if (session.user.userId !== id) {
    throw new Error("Não autorizado");
  }

  // save image
  let imageUrl = await storagedImage(imageFile);

  const dataUpdate = imageUrl ? { name, image: imageUrl } : { name };

  await prisma.user.update({
    where: { id },
    data: dataUpdate,
  });

  revalidatePath("/profile");
  return { message: "perfil", type: "sucess" };
}

export async function createPost(
  formState: any,
  formData: FormData
): Promise<formState> {
  const session = await auth();
  if (!session) redirect("/");

  const caption = formData.get("caption") as string;
  const imageFile = formData.get("image") as File;

  if (!caption || imageFile.size === 0) {
    return { message: "Legenda obrigatoria", type: "error" };
  }

  let imageUrl = await storagedImage(imageFile);
  // save image
  if(!imageUrl) {
    return { message: "Aconteceu um erro ao armazenar imagem, tente novamente", type: "error" };
  }


    await prisma.post.create({
      data: {
        imageUrl,
        caption,
        userId: session.user.userId,
      },
    });
  

  revalidatePath("/");
  redirect("/");
  return { message: "postagem criada com sucesso", type: "sucess" };
}
