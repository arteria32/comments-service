import cn from 'classnames';

import styles from './HeaderPart.module.scss';

const HeaderPart = () => {
  console.log('rerender header');
  return (
    <div className={styles.header}>
      <div className={cn(styles.block, styles.left)}>leftBlock</div>
      <div className={cn(styles.block, styles.center)}>center</div>
      <div className={cn(styles.block, styles.right)}>rightBlock</div>
    </div>
  );
};

export default HeaderPart;
