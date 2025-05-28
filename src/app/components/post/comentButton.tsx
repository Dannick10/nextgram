import React, { useState } from "react";
import { Post } from "../../../../types/Post";
import Modal from "react-modal";
import FlaskMassage from "../FlaskMassage";
import { addComment } from "@/app/actions";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
interface CommentModalProps {
  post: Post;
  currentUserId?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const CommentMOdal = ({
  post,
  currentUserId,
  isOpen,
  onRequestClose,
}: CommentModalProps) => {
  const [comment, SetComment] = useState("");
  const [flashMessage, SetFlashMessage] = useState<{
    message: string;
    type: "error" | "sucess";
  } | null>(null);

  const handleAddComent = async () => {
    if (!currentUserId) {
      window.location.href = "/";
      return;
    }

    if (!comment.trim()) {
      //flash message
      SetFlashMessage({
        message: "o comentario não pode estar vazio.",
        type: "error",
      });
    }

    await addComment(post.id, currentUserId, comment);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="comentarios"
      ariaHideApp={false}
      className={
        "w-[704px] mx-auto mt-20 bg-white rounded border boder-zinc-300"
      }
    >
      <div className="px-4 flex items-center justify-between">
        <h2>Comentarios</h2>
        <button className="w-6 h-6 text-red-500 cursor-pointer" onClick={onRequestClose}>
          <IoClose />
        </button>
      </div>
      {flashMessage && (
        <FlaskMassage message={flashMessage.message} type={flashMessage.type} />
      )}

      <div className="mb-4 flex flex-col gap-0.5">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div >
              <div className="flex items-center" key={comment.id}>
                {comment.user.image && (
                  <Image
                    src={comment.user.image}
                    alt={comment.user.name || "nome do usuario"}
                    width={30}
                    height={30}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                )}

                <h3>{comment.user.name}</h3>
              </div>

              <p className="py-2 px-10">{comment.content}</p>
            </div>
          ))
        ) : (
          <p> não tem comentarios</p>
        )}
      </div>

      {currentUserId && (
        <div className="mb-4 flex flex-col gap-6">
          <textarea
            className="w-full h-32 p-2 border border-zinc-300 rounded text-sm font-medium "
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
            placeholder="digite um comentário"
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={handleAddComent}
              className="p-2 px-4 text-green-500 cursor-pointer"
            >
              Comentar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CommentMOdal;
