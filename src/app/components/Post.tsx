"use client";
import React from "react";
import { Post as PostType } from "../../../types/Post";
import Image from "next/image";
import LikeButton from "./post/LikeButton";

interface postProps {
  post: PostType;
  currentID?: string;
}

const Post = ({ post, currentID }: postProps) => {
  let isLiked = false;

  if (post.likes) {
    isLiked = post.likes.some((like) => like.userId === currentID);
  }

  return (
    <div className="w-fit mx-auto mb-6 p-4 border rounded shadow-md">
      <Image
        src={post.imageUrl}
        alt={post.caption || "imagem sem legenda"}
        className="w-[470px] h-470px object-cover mb-4 rounded"
        width={670}
        height={400}
      />
      {post.caption && (
        <p className="mb-4 text-sm font-medium">{post.caption}</p>
      )}
      <div className="flex flex-center">
        {post.user.image && (
          <Image
            src={post.user.image}
            alt={post.user.name || "imagem do usuario"}
            className="w-10 h-10 object-cover rounded-full mr-3"
            width={40}
            height={40}
          />
        )}
        <p className="text-sm font-medium">{post.user.name}</p>
      </div>
      <div className="flex items-center mt-4">
        <LikeButton
          postId={post.id}
          initialLikesCount={post.likes?.length || 0}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
};

export default Post;
