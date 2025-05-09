
import { Like } from "@prisma/client";
import { Post } from "./Post";
import { Comments } from "./Comments";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  likes?: Like[];
  comments?: Comments[];
}