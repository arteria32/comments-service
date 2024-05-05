import { Button, Card, TextArea } from '@gravity-ui/uikit';
import cn from 'classnames';
import dayjs from 'dayjs';
import { FC, memo } from 'react';
import { Comment } from '../../types/api/comment';
import styles from './CommentCard.module.scss';
type CommentCardProps = Comment & { className: string };

const getParsedUpdatedTime = (comment: Comment) =>
  dayjs(comment.modifedAt || comment.createdAt).format('DD:MM:YYYY hh:mm');

const CommentCard: FC<CommentCardProps> = (comment) => {
  return (
    <Card className={cn(styles.card, comment.className)}>
      <section className={styles.header}>
        <section>
          <p>
            <span className={styles.title}>Автор:</span>
            {comment.userId}
          </p>
          <p>
            <span className={styles.title}>Объект комментария:</span>
            {comment.objectId}
          </p>
        </section>

        <section className={styles.actions}>
          <p>
            <span className={styles.title}>Последнее изменение:</span>
            {getParsedUpdatedTime(comment)}
          </p>
          <Button size="s">Редактировать</Button>
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
