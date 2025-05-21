
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

export const storagedImage = async (imageFile: File) => {

    if (imageFile && imageFile.name !== "undefined") {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        //diretorio
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, imageFile.name);
        const arrayBuffer = await imageFile.arrayBuffer();
        //arquivo
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    
        return  `/uploads/${imageFile.name}`;
      }
}