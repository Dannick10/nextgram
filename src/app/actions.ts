"use server"

import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { auth } from "auth";

import { User } from "next-auth";
import { redirect } from "next/navigation";
import {promises as fs} from "fs"
import path from "path";
import { FormStatus } from "react-dom";
import { revalidatePath } from "next/cache";

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
    const session = await auth()
    if(!session) redirect("/")

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File;

    if(session.user.userId !== id) {
        throw new Error("Não autorizado")
    }

    // save image 
    let imageUrl 
    if(imageFile && imageFile.name !== "undefined") {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        //diretorio
        await fs.mkdir(uploadDir, { recursive: true})
        const filePath = path.join(uploadDir, imageFile.name)
        const arrayBuffer = await imageFile.arrayBuffer()
        //arquivo
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));

        imageUrl = `/uploads/${imageFile.name}`
    }

    const dataUpdate = imageUrl ? {name, image: imageUrl} : {name}

    await prisma.user.update({
        where: {id},
        data: dataUpdate
    })


    revalidatePath("/profile")
  return {message: "perfil", type: "sucess"};
}
