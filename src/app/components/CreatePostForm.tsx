"use client";

import { User } from "next-auth";
import React from "react";
import { useActionState } from "react";

import { createPost, updateUserProfile } from "../actions";
import ImagePreview from "./ImagePreview";
import FlaskMassage from "./FlaskMassage";

const CreatePostForm = () => {
  const [formState, formAction] = useActionState(createPost, {
    message: "",
    type: "sucess",
  });

  return (
    <div>
      {formState.message && (
        <FlaskMassage message={formState.message} type={formState.type} />
      )}
      <form action={formAction} encType="multipart/form-data">
        <input type="hidden" name="id" />
        <div>
          <div className="flex flex-col gap-2 justify-end">
          <p>Imagem preview</p>
          <ImagePreview />
            <label
              htmlFor="caption"
              className="text-sm font-medium text-zinc-400 ml-2"
            >
              nome
            </label>
            <textarea
              id="caption"
              name="caption"
              placeholder="didite algo"
              defaultValue={""}
              className="p-2 border border-zinc-300 rounded w-full text-sm placeholder: text-zinc-400"
            ></textarea>
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

export default CreatePostForm;
