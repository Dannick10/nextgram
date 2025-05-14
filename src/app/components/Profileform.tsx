"use client";

import { User } from "next-auth";
import React from "react";
import { useFormState } from "react-dom";
import { updateUserProfile } from "../actions";
import ImagePreview from "./ImagePreview";
import FlaskMassage from "./FlaskMassage";
import { FaPray } from "react-icons/fa";

type profileForm = {
  user: User;
};

const Profileform = ({ user }: profileForm) => {
  const [formState, formAction] = useFormState(updateUserProfile, {
    message: "a",
    type: "sucess",
  });

  return (
    <div>
      {formState.message && (
        <FlaskMassage message={formState.message} type={formState.type} />
      )}
      <form action={formAction} encType="multipart/form-data">
        <input type="hidden" name="id" value={user.id} />
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-zinc-400 ml-2"
          >
            nome
          </label>
          <input
            type="text"
            id="name"
            placeholder="didite seu nome"
            defaultValue={user.name || ""}
            className="p-2 border border-zinc-300 rounded w-full text-sm placeholder: text-zinc-400"
          />
          <p>Imagem preview</p>
          <ImagePreview />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 rounded cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profileform;
