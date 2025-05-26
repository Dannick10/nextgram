import React, { useState } from "react";
import { Post } from "../../../../types/Post";
import Modal from "react-modal";
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

  const handleAddComent = async () => {
    if (!currentUserId) {
      window.location.href = "/";
      return;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="comentarios"
      ariaHideApp={false}
      className={"w-[704px] mx-auto bg-white rounded border boder-zinc-300"}
    >
      {currentUserId && (
        <div className="mb04 flex flex-col gap-6">
          <textarea
            className="w-full h-32 p-2 border border-zinc-300 rounded text-sm font-medium "
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
            placeholder="digite um comentário"
          ></textarea>
          <div className="flex justify-end">
            <button onClick={handleAddComent}>Comentar</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CommentMOdal;
