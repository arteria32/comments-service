import { Comment } from '@models/comment';
import { query } from './database';

export const getAllComments = async (): Promise<Comment[]> => {
  const result = await query('SELECT * FROM public.comments');
  console.log('result', result);
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
