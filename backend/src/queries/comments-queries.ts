import { Comment } from '@models/comment';
import { query } from './database';

export const getAllComments = async (): Promise<Comment[]> => {
  const result = await query(
    'SELECT * FROM public.comments ORDER BY created_at asc',
  );
  if (!result) return [];
  const comments = result?.rows.map(
    (item) =>
      new Comment(
        item['object_id'],
        item['body'],
        item['user_id'],
        item['id'],
        item['created_at'],
        item['modifed_at'],
      ),
  );
  return comments;
};
export const getCommentById = async (
  id: string,
): Promise<Comment | undefined | null> => {
  const result = await query(`SELECT * FROM public.comments WHERE ID=${id}`);
  if (!result) return null;
  const comment = result?.rows
    .map(
      (item) =>
        new Comment(
          item['object_id'],
          item['body'],
          item['user_id'],
          item['id'],
          item['created_at'],
          item['modifed_at'],
        ),
    )
    .at(0);
  return comment;
};
