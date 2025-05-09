import { Comments } from "./Comments";
import { User } from "./User";
import { Like } from "@prisma/client";

export interface Post {
  id: string;
  imageUrl: string;
  caption?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  likes?: Like[] | [];
  comments?: Comments[] | [];
}