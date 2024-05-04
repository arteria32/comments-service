import { Comment, CommentInstance } from '@models/comment';
import {
  queryDeleteCommentById,
  queryGetAllComments,
  queryGetCommentById,
  queryInsertNewComment,
  qureyUpdateCommentById,
} from 'src/queries/comments-queries';

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
}

export default CommentsController;
