"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "auth";

import { User } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { storagedImage } from "./utils/storaggedImage";
import { verifySessionUser } from "./utils/verifySessionUser";

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
  if (!imageUrl) {
    return {
      message: "Aconteceu um erro ao armazenar imagem, tente novamente",
      type: "error",
    };
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

export async function getUserPost(userId: string) {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.userId !== userId) {
    throw new Error("Não autorizado");
  }

  return await prisma.post.findMany({
    where: { userId },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deletePost(formData: FormData) {
  const session = await auth();

  if (!session) redirect("/");

  const userId = formData.get("userId") as string;
  const postId = formData.get("postId") as string;

  if (session.user.userId !== userId) {
    throw new Error("Não autorizado!");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/myposts");

  redirect("/myposts");
}

export async function getAllPost() {
  return await prisma.post.findMany({
    include: {
      user: true,
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function likePost(postId: string, userId: string) {
  verifySessionUser(userId);

  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  revalidatePath("/");
}

export async function addComment(
  postId: string,
  userId: string,
  content: string
) {
  verifySessionUser(userId);

  await prisma.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });

  revalidatePath("/");
}
