export type CommentInstance = {
  userId: string;
  objectId: string;
  body: string;
};
export type Comment = CommentInstance & {
  id: number;
  createdAt?: string;
  modifedAt?: string;
};
