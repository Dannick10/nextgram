import { redirect } from "next/navigation";
import React from "react";
import { getUserByEmail } from "../actions";
import Image from "next/image";
import Profileform from "../components/Profileform";
import { auth } from "auth";

type Props = {};

const Profilepage = async () => {
  const session = await auth();

  if (!session || !session.user?.email) return redirect("/");

  const user = await getUserByEmail(session.user.email);

  if (!user) return redirect("/");

  return <div className="w-[35rem] mx-auto my-10 p-4">
    <h1 className="text-[2rem] leading-10 font-semibold text-center">Perfil de {user?.name}</h1>
    {user.image && (
      <div className="w-full grid place-items-center my-4">
        <Image
        src={user.image}
        alt={`perfil de ${user.name}`}
        className="w-40 h-40 p-4 object-cover"
        width={320}
        height={320}
        />
      </div>
    )}
    <Profileform user={user}/>
  </div>;
};

export default Profilepage;
