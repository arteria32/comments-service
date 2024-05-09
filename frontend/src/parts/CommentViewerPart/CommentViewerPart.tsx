import { Alert, Button, Loader, TextArea, TextInput } from '@gravity-ui/uikit';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { FC, useEffect } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Comment, CommentInstance } from 'types/features/comment';
import {
  useCreateCommentMutation,
  useLazyGetCommentByIdQuery,
  useUpdateCommentMutation,
} from '../../services/API/comments.api';
import styles from './CommentViewerPart.module.scss';

type CommentViewerPartProps = {
  commentId?: number | null;
  isNewComment?: boolean;
};

const DEFAULT_COMMENT_VALUE: CommentInstance = {
  userId: 'Default user',
  objectId: 'Default object',
  body: 'Comment body',
};

const CommentViewerPart: FC<CommentViewerPartProps> = ({
  commentId,
  isNewComment,
}) => {
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
  const [
    updateComment,
    { isLoading: isUpdatingComment, error: errorUpdateComment },
  ] = useUpdateCommentMutation();

  const [
    createNewComment,
    {
      isLoading: isCreatingNewComment,
      error: errorCreateComment,
      data: newComment,
    },
  ] = useCreateCommentMutation();

  const onSubmit = (data: CommentInstance) => {
    if (commentId) {
      //Update currrent comment
      const payload: Comment = {
        ...data,
        id: commentId,
      };
      updateComment(payload);
    } else {
      //Create  new comment
      createNewComment(data);
    }
  };

  const checkLoadingComment = () => isCreatingNewComment || isUpdatingComment;

  useEffect(() => {
    if (!errorUpdateComment) return;
    alert(errorUpdateComment);
  }, [errorUpdateComment]);

  useEffect(() => {
    if (!errorCreateComment) return;
    alert(errorCreateComment);
  }, [errorCreateComment]);

  /* NavigateToSavedComment */
  const navigate = useNavigate();
  useEffect(() => {
    if (!newComment) return;
    navigate(`/comment/${newComment.id}`);
  }, [newComment]);

  const renderCardForm = () => {
    return (
      <Form
        control={commentControl}
        className={styles.form}
        onSubmit={(value) => onSubmit(value.data)}
      >
        <Controller
          name="userId"
          disabled={checkLoadingComment()}
          control={commentControl}
          render={({ field }) => (
            <TextInput label="Автор комментария" {...field} />
          )}
        />
        <Controller
          name="objectId"
          disabled={checkLoadingComment()}
          control={commentControl}
          render={({ field }) => (
            <TextInput label="Объект комментария" {...field} />
          )}
        />
        <Controller
          name="body"
          disabled={checkLoadingComment()}
          control={commentControl}
          render={({ field }) => <TextArea rows={4} {...field} />}
        />
        <Button type="submit" view="action" disabled={checkLoadingComment()}>
          Cохранить изменения
        </Button>
      </Form>
    );
  };
  const renderContentByStatus = (status: QueryStatus) => {
    switch (status) {
      case QueryStatus.uninitialized:
        return 'uninitialized';
      case QueryStatus.fulfilled:
        return renderCardForm();
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
      {isNewComment
        ? renderCardForm()
        : renderContentByStatus(commentInfoStatus)}
    </div>
  );
};

export default CommentViewerPart;
