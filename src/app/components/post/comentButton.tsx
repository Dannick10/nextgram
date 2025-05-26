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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="comentarios"
      ariaHideApp={false}
      className={"w-[704px] mx-auto bg-white rounded border boder-zinc-300"}
    ></Modal>
  );
};

export default CommentMOdal;
