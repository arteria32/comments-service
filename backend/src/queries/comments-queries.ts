import { Comment, CommentInstance } from '@models/comment';
import { query } from './database';

const parseCommentFromDataBase = (item: any): Comment =>
  new Comment(
    item['object_id'],
    item['body'],
    item['user_id'],
    item['id'],
    item['created_at'],
    item['modifed_at'],
  );

export const queryGetAllComments = async (): Promise<Comment[]> => {
  const result = await query(
    'SELECT * FROM public.comments ORDER BY modifed_at DESC',
  );
  if (!result) return [];
  const comments = result?.rows.map(parseCommentFromDataBase);
  return comments;
};

export const queryGetCommentById = async (
  id: number,
): Promise<Comment | undefined | null> => {
  const result = await query(`SELECT * FROM comments WHERE ID=${id}`);
  if (!result) return null;
  const comment = result?.rows.map(parseCommentFromDataBase).at(0);
  return comment;
};

export const queryDeleteCommentById = async (id: number) => {
  const result = await query(`DELETE  FROM comments WHERE ID=${id}`);
  console.log('result deleteCommentById', result);
};

export const queryInsertNewComment = async (
  body: CommentInstance,
): Promise<Comment | undefined | null> => {
  const text =
    'INSERT INTO comments(object_id, body,user_id) VALUES($1, $2,$3) RETURNING *';
  const values = [body.objectId, body.body, body.userId];
  const result = await query(text, values);
  const comment = result?.rows.map(parseCommentFromDataBase).at(0);
  return comment;
};
export const qureyUpdateCommentById = async (
  id: number,
  body: CommentInstance,
): Promise<Comment | undefined | null> => {
  const text = `UPDATE comments SET object_id=$1, body=$2, user_id=$3, modifed_at=NOW() WHERE ID=${id} RETURNING *`;
  const values = [body.objectId, body.body, body.userId];
  const result = await query(text, values);
  const comment = result?.rows.map(parseCommentFromDataBase).at(0);
  return comment;
};
