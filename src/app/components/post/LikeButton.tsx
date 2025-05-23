import { likePost } from "@/app/actions";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

type likeButtonProps = {
  postId: string;
  initialLikesCount: number;
  isLiked: boolean;
  currentUserId?: string;
};

const LikeButton = ({
  postId,
  initialLikesCount,
  isLiked,
  currentUserId,
}: likeButtonProps) => {
  const [likesCount, SetLikesCount] = useState(initialLikesCount);
  const [liked, Setliked] = useState(isLiked);

  const handleLike = async () => {
    if(!currentUserId) {
        redirect("/signin")
    }

    await likePost(postId, currentUserId)

    Setliked(!liked)
    SetLikesCount(liked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <div className="flex items-center mr-2" onClick={handleLike}>
      <button className="w-6 h-6 text-gray-500 cursor-pointer">
        {liked ? <BsFillHeartFill /> : <BsHeart />}
      </button>
      <span>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
