import React, { JSX } from "react";
import { providerMap, signIn } from "auth";

import { BsGoogle } from "react-icons/bs";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";

const icons = [{ name: "Google", icon: <BsGoogle /> }];

const SignInPage = () => {
  const findIcons = (name: string): JSX.Element => {
    const found = icons.find((item) => item.name === name);
    return found ? found.icon : <></>;
  };

  return (
    <div className="w-1/2 mx-auto my-10 px-4 flex flex-col gap-2">
      <h2 className="text-xl leading-10 font-semibold text-center">
        Acedsse ou crie sua conta com uma das opções disponíveis
      </h2>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id, { redirectTo: "/" });
          }}
          className="mt-10 flex justify-center"
        >
          <button className="gap-2 border border-zinc-600 flex items-center justify-center rounded hover:bg-zinc-700 px-6 py-1 font-medium">
            <p>{findIcons(provider.name)}</p>
            <span>
              Entrar com o <strong>{provider.name}</strong>
            </span>
          </button>
        </form>
      ))}
    </div>
  );
};

export default SignInPage;
