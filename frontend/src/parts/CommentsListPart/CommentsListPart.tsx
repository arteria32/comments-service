import { Alert, Button, Loader } from '@gravity-ui/uikit';
import { QueryStatus } from '@reduxjs/toolkit/query';
import CommentCard from 'components/CommentCard/CommentCard';
import { FC, Fragment, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment } from 'types/api/comment';
import {
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
} from '../../services/API/comments.api';
import styles from './CommentsListPart.module.scss';

const CommentsListPart: FC = () => {
  //Fetching data
  const {
    data: commentsList,
    status: commentsListStatus,
    refetch: refetchCardsList,
  } = useGetAllCommentsQuery(null);

  //Handle edit comment
  const navigate = useNavigate();

  const handleCardEdit = useCallback((commentBody: Comment) => {
    navigate(`/comment/${commentBody.id}`);
  }, []);

  //Handle delete comment
  const [deleteComment, resultDeleteComment] = useDeleteCommentMutation();
  const handelCardDelete = (commentBody: Comment) => {
    deleteComment(commentBody.id);
  };
  useEffect(() => {
    if (resultDeleteComment.error) {
      alert(resultDeleteComment.error);
    }
  });
  /*  */
  const commentsCards = useMemo(() => {
    return (
      <div className={styles.scrollList}>
        {commentsList?.map((comment) => (
          <Fragment key={comment.id}>
            <CommentCard
              {...comment}
              className={styles.commentCard}
              onCommentEdit={(commentBody) => handleCardEdit(commentBody)}
              onCommentDelete={(commentBody) => handelCardDelete(commentBody)}
            />
          </Fragment>
        ))}
      </div>
    );
  }, [commentsList]);

  const renderContentByStatus = (status: QueryStatus) => {
    switch (status) {
      case QueryStatus.uninitialized:
        return 'uninitialized';
      case QueryStatus.fulfilled:
        return commentsCards;
      case QueryStatus.pending:
        return (
          <div className={styles.plug}>
            <Loader size="l" /> <h2>Загрузка карточек</h2>
          </div>
        );
      case QueryStatus.rejected:
        return (
          <div className={styles.plug}>
            <Alert
              theme="danger"
              title="Ошибка загрузки комментариев"
              message="Повторите проблему позже"
            />
            <Button
              view="outlined-danger"
              size="l"
              onClick={() => refetchCardsList()}
            >
              Повторить попытку
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={styles.layout}>
      {renderContentByStatus(commentsListStatus)}
    </div>
  );
};

export default CommentsListPart;
