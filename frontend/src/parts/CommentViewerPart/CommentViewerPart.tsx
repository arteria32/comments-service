import { Alert, Button, Loader, TextArea, TextInput } from '@gravity-ui/uikit';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { FC, useEffect } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { Comment, CommentInstance } from 'types/api/comment';
import {
  useLazyGetCommentByIdQuery,
  useUpdateCommentMutation,
} from '../../services/API/comments.api';
import styles from './CommentViewerPart.module.scss';

type CommentViewerPartProps = {
  commentId: number | null;
};

const DEFAULT_COMMENT_VALUE: CommentInstance = {
  userId: 'Default user',
  objectId: 'Default object',
  body: 'Comment body',
};

const CommentViewerPart: FC<CommentViewerPartProps> = ({ commentId }) => {
  /* Fetch comment info */
  const [fetchCommentInfo, { data: commentInfo, status: commentInfoStatus }] =
    useLazyGetCommentByIdQuery();

  /* Parse comment Id */
  useEffect(() => {
    if (!commentId) return;
    fetchCommentInfo(commentId);
  }, [commentId]);

  /* Form Control */
  const { control: commentControl } = useForm<CommentInstance>({
    defaultValues: DEFAULT_COMMENT_VALUE,
    values: commentInfo,
  });
  /* Handler to Save Comment */
  const [updateComment, { isLoading: isUpdatingComment }] =
    useUpdateCommentMutation();
  const onSubmit = (data: CommentInstance) => {
    console.log('data', data);
    if (commentId) {
      //Update currrent comment
      const payload: Comment = {
        ...data,
        id: commentId,
      };
      console.log('payload', payload);
      updateComment(payload);
    } else {
      //Create  new comment
    }
  };

  const renderCardForm = () => {
    return (
      <Form
        control={commentControl}
        className={styles.form}
        onSubmit={(value) => onSubmit(value.data)}
      >
        <Controller
          name="userId"
          disabled={isUpdatingComment}
          control={commentControl}
          render={({ field }) => (
            <TextInput label="Автор комментария" {...field} />
          )}
        />
        <Controller
          name="objectId"
          disabled={isUpdatingComment}
          control={commentControl}
          render={({ field }) => (
            <TextInput label="Объект комментария" {...field} />
          )}
        />
        <Controller
          name="body"
          disabled={isUpdatingComment}
          control={commentControl}
          render={({ field }) => <TextArea rows={4} {...field} />}
        />
        <Button type="submit" disabled={isUpdatingComment}>
          Обновить комментарий
        </Button>
      </Form>
    );
  };
  const renderContentByStatus = (status: QueryStatus) => {
    switch (status) {
      case QueryStatus.uninitialized:
        return 'uninitialized';
      case QueryStatus.fulfilled:
        return commentControl ? renderCardForm() : 'Bad Request';
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
            <Button view="outlined-danger" size="l">
              Повторить попытку
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={styles.layout}>
      {renderContentByStatus(commentInfoStatus)}
    </div>
  );
};

export default CommentViewerPart;
