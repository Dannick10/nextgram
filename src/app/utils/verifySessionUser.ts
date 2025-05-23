import { auth } from "auth";
import { redirect } from "next/navigation";

export const verifySessionUser = async (userId: string) => {
  const session = await auth();
  if (!session) redirect("/");

  if (session.user.id !== userId) {
    throw new Error("Não autorizado!");
  }
};
