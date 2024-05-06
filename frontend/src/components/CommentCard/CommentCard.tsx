import { Button, Card, TextArea } from '@gravity-ui/uikit';
import cn from 'classnames';
import dayjs from 'dayjs';
import { FC, memo, useCallback } from 'react';
import { Comment } from '../../types/api/comment';
import styles from './CommentCard.module.scss';
type CommentCardProps = Comment & {
  className: string;
  onCommentEdit?: (comment: Comment) => void;
  onCommentDelete?: (comment: Comment) => void;
};

const getParsedUpdatedTime = (comment: Comment) =>
  dayjs(comment.modifedAt || comment.createdAt).format('DD:MM:YYYY HH:MM');

const CommentCard: FC<CommentCardProps> = (comment) => {
  const handleEditClick = useCallback(() => {
    if (!comment.onCommentEdit) return;
    comment.onCommentEdit(comment);
  }, [comment.onCommentEdit]);

  const handleDeleteClick = useCallback(() => {
    if (!comment.onCommentDelete) return;
    comment.onCommentDelete(comment);
  }, [comment.onCommentDelete]);

  return (
    <Card className={cn(styles.card, comment.className)}>
      <section className={styles.header}>
        <section>
          <p>
            <span className={styles.title}>Автор:</span>
            {comment.userId}
          </p>
          <p>
            <span className={styles.title}>Объект:</span>
            {comment.objectId}
          </p>
          <p>
            <span className={styles.title}>Последнее изменение:</span>
            {getParsedUpdatedTime(comment)}
          </p>
        </section>

        <section className={styles.actions}>
          <Button size="s" onClick={() => handleEditClick()}>
            Редактировать
          </Button>
          <Button
            size="s"
            view="outlined-danger"
            onClick={() => handleDeleteClick()}
          >
            Удалить
          </Button>
        </section>
      </section>

      <section className={styles.body}>
        <TextArea
          disabled
          value={comment.body}
          className={styles.textArea}
        ></TextArea>
      </section>
    </Card>
  );
};

export default memo(CommentCard);
