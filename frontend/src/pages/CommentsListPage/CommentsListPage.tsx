import { FC } from 'react';
import CommentsListPart from '../../parts/CommentsListPart/CommentsListPart';
import styles from './CommentsListPage.module.scss';
const CommentsListPage: FC = () => {
  return (
    <div className={styles.page}>
      <CommentsListPart />
    </div>
  );
};

export default CommentsListPage;
