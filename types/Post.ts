import { Like } from "@prisma/client";
import { User } from "./User";
import { Comments } from "./Comments";


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