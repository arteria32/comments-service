import { Comment, CommentInstance } from '@models/comment';
import { DateRange } from '@models/date-range';
import {
  queryDeleteCommentById,
  queryGetAllComments,
  queryGetCommentById,
  queryGetCommentsByFilter,
  queryGetCommentsByLimit,
  queryInsertNewComment,
  qureyUpdateCommentById,
} from '@queries/comments-queries';

export type CommentsPagePayload = {
  data: Comment[];
  cursor: number;
};

class CommentsController {
  getAllComments(): Promise<Comment[]> {
    return queryGetAllComments();
  }

  getCommentById(id: string | number): Promise<Comment | undefined | null> {
    return queryGetCommentById(Number(id));
  }

  deleteCommentById(id: string | number) {
    return queryDeleteCommentById(Number(id));
  }

  addNewComment(comment: CommentInstance): Promise<Comment | undefined | null> {
    return queryInsertNewComment(comment);
  }

  updateComment(
    id: string | number,
    comment: CommentInstance,
  ): Promise<Comment | undefined | null> {
    return qureyUpdateCommentById(Number(id), comment);
  }

  getCommentsByFilter(
    userIds: string[] = [],
    objectIds: string[] = [],
    dateRange?: DateRange | null,
  ): Promise<Comment[] | undefined | null> {
    return queryGetCommentsByFilter(userIds, objectIds, dateRange);
  }

  getCommentsByLimit(
    cursor: number,
    limit: number,
  ): Promise<CommentsPagePayload> {
    return queryGetCommentsByLimit(limit, cursor).then((res) => ({
      data: res || [],
      cursor: Number(res?.at(-1)?.id),
    }));
  }
}

export default CommentsController;
