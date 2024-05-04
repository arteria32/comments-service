import cn from 'classnames';

import { Select } from '@gravity-ui/uikit';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../services/slices/ui-manager.slice';
import { RootState } from '../../services/store';
import { ThemesEnum } from '../../types/system/ui-types';
import styles from './HeaderPart.module.scss';

const THEMES_ITEMS = [
  { value: ThemesEnum.LIGHT, content: 'Светлая тема' },
  { value: ThemesEnum.DARK, content: 'Темная тема' },
];
const HeaderPart = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.uiManagerSlice.theme,
  );
  const selectedTheme = useMemo(() => {
    return [currentTheme];
  }, [currentTheme]);
  const dispatch = useDispatch();
  const handleThemeChange = useCallback((selectedValues: string[]) => {
    const newValue = selectedValues.at(0);
    dispatch(changeTheme(newValue as ThemesEnum));
  }, []);
  return (
    <div className={styles.header}>
      <div className={cn(styles.block, styles.left)}>
        <h1>Cервис комментариев</h1>
      </div>
      <div className={cn(styles.block, styles.center)}></div>
      <div className={cn(styles.block, styles.right)}>
        <Select
          options={THEMES_ITEMS}
          value={selectedTheme}
          onUpdate={(value) => handleThemeChange(value)}
        />
      </div>
    </div>
  );
};

export default HeaderPart;
