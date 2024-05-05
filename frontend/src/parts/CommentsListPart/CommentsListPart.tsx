import { Alert, Button, Loader } from '@gravity-ui/uikit';
import { QueryStatus } from '@reduxjs/toolkit/query';
import CommentCard from 'components/CommentCard/CommentCard';
import { FC, Fragment, useMemo } from 'react';
import { useGetAllCommentsQuery } from '../../services/API/comments.api';
import styles from './CommentsListPart.module.scss';

const CommentsListPart: FC = () => {
  const {
    data: commentsList,
    status: commentsListStatus,
    refetch: refetchCardsList,
  } = useGetAllCommentsQuery(null);

  const commentsCards = useMemo(() => {
    return (
      <div className={styles.scrollList}>
        {commentsList?.map((comment) => (
          <Fragment key={comment.id}>
            <CommentCard {...comment} className={styles.commentCard} />
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
