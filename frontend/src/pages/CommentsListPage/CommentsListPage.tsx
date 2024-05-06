import { Button } from '@gravity-ui/uikit';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentsListPart from '../../parts/CommentsListPart/CommentsListPart';
import styles from './CommentsListPage.module.scss';
const CommentsListPage: FC = () => {
  const navigate = useNavigate();

  const createNewComment = () => {
    navigate('/comment');
  };
  return (
    <div className={styles.page}>
      <section className={styles.body}>
        <CommentsListPart />
      </section>
      <section className={styles.actions}>
        <Button view="action" onClick={() => createNewComment()}>
          Создать новый комментарий
        </Button>
      </section>
    </div>
  );
};

export default CommentsListPage;
