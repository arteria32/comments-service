import { Alert, Button, Loader, Pagination } from '@gravity-ui/uikit';
import { QueryStatus } from '@reduxjs/toolkit/query';
import CommentCard from 'components/CommentCard/CommentCard';
import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment } from 'types/features/comment';
import {
  useDeleteCommentMutation,
  useLazyGetPaginationCommentsQuery,
} from '../../services/API/comments.api';
import styles from './CommentsListPart.module.scss';

const DEFAULT_PAGE_LIMIT = 9;

const CommentsListPart: FC = () => {
  //Fetching data
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const historyPageCursors = useRef(new Map<number, number>());

  const [pageConfig, setPageConfig] = useState<{
    page: number;
    totalItems: number;
  }>({
    page: 1,
    totalItems: DEFAULT_PAGE_LIMIT,
  });

  const [
    getPageComments,
    { data: resultPageCommentsList, status: commentsListStatus },
  ] = useLazyGetPaginationCommentsQuery();

  const refetchCardsList = () => {
    getPageComments({
      cursor: 0,
      limit: DEFAULT_PAGE_LIMIT,
    }).then(({ data }) => {
      if (!data) return;
      const { cursor } = data;
      historyPageCursors.current.set(2, cursor);
    });
  };

  useEffect(() => {
    refetchCardsList();
  }, []);

  useEffect(() => {
    if (!resultPageCommentsList) return;
    setCommentsList(resultPageCommentsList?.data);
    //Добавляем возможность переключиться на следующую страницу, если достаточное количество элементов пришло на текущую страницу и есть ссылка на следующий курсор
    if (
      resultPageCommentsList.data.length >= DEFAULT_PAGE_LIMIT &&
      resultPageCommentsList.cursor
    ) {
      setPageConfig((prevState) => {
        return {
          ...prevState,
          totalItems: (prevState.page + 1) * DEFAULT_PAGE_LIMIT,
        };
      });
    }
  }, [resultPageCommentsList]);

  /* Handle pageClick */

  const handleUpdate = (page: number) => {
    setPageConfig((prevState) => ({ ...prevState, page }));
    const historyCursor = historyPageCursors.current.get(page);
    //return to start position
    if (page === 1) return refetchCardsList();

    getPageComments({
      cursor: historyCursor,
      limit: DEFAULT_PAGE_LIMIT,
    }).then(({ data }) => {
      if (!data) return;
      const { cursor } = data;
      historyPageCursors.current.set(page + 1, cursor);
    });
  };
  /*  */
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
      <div className={styles.gridList}>
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
      <section className={styles.actions}>
        <Pagination
          className={styles.paginationBlock}
          page={pageConfig?.page}
          total={pageConfig?.totalItems}
          pageSize={DEFAULT_PAGE_LIMIT}
          showPages={false}
          onUpdate={(page) => handleUpdate(page)}
        />
        <Button
          view="outlined-info"
          size="m"
          onClick={() => refetchCardsList()}
        >
          Обновить данные
        </Button>
      </section>
    </div>
  );
};

export default CommentsListPart;
