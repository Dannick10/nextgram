
import { User } from "./User";
import { Post } from "./Post";

export interface Comments {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  post?: Post;
}
