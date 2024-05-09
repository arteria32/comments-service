import { Comment, CommentInstance } from '@models/comment';
import { DateRange } from '@models/date-range';
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

const parsefilterStringFromDateRange = (range: DateRange): string => {
  if (range.from && range.to) {
    return `((modifed_at) BETWEEN '${range.from}' AND '${range.to}')`;
  } else if (range.from) {
    return `((modifed_at) > '${range.from}')`;
  } else if (range.to) {
    return `((modifed_at) < '${range.to}')`;
  }
  return '';
};

const combineFiltersToString = (key: string, values: string[]): string =>
  `(${values.map((item) => `${key}='${item}'`).join(' OR ')})`;

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

export const queryGetCommentsByFilter = async (
  usersIds: string[],
  objectsIds: string[],
  dateRange?: DateRange | null,
): Promise<Comment[] | undefined | null> => {
  const filterStrings: string[] = [];
  if (dateRange) filterStrings.push(parsefilterStringFromDateRange(dateRange));
  if (objectsIds.length > 0)
    filterStrings.push(combineFiltersToString('object_id', objectsIds));
  if (usersIds.length > 0)
    filterStrings.push(combineFiltersToString('user_id', usersIds));
  const resultString =
    filterStrings.length > 0 ? `WHERE ${filterStrings.join(' AND ')}` : '';
  const result = await query(`SELECT * FROM public.comments ${resultString}`);
  const comments = result?.rows?.map(parseCommentFromDataBase);
  return comments;
};
