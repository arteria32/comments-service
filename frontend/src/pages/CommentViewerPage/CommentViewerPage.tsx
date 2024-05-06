import { Alert, Button } from '@gravity-ui/uikit';
import CommentViewerPart from 'parts/CommentViewerPart/CommentViewerPart';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CommentsViewerPage.module.scss';
const CommentViewerPage: FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const navigateToCommentsList = () => {
    navigate('/comments');
  };

  const checkCommentId = (commentId?: string) => {
    if (!commentId) {
      return <CommentViewerPart isNewComment />;
    }
    const parsedId = Number(commentId);
    if (Number.isNaN(parsedId)) {
      return (
        <div className={styles.plug}>
          <Alert
            theme="warning"
            title="Ошибка чтения Id карточки"
            message="Повторите проблему позже"
          />
          <Button
            view="outlined-warning"
            size="l"
            onClick={() => navigateToCommentsList()}
          >
            Вернуться к списку комментариев
          </Button>
        </div>
      );
    }
    return <CommentViewerPart commentId={parsedId} />;
  };

  return (
    <div className={styles.page}>
      <section className={styles.body}>{checkCommentId(id)}</section>
      <section className={styles.actions}>
        <Button onClick={() => navigateToCommentsList()}>
          Вернуться к списку комментариев
        </Button>
      </section>
    </div>
  );
};

export default CommentViewerPage;
