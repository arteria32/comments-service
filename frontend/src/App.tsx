import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import HeaderPart from './core/header/HeaderPart';
import { RootState } from './services/store';

const App = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.uiManagerSlice.theme,
  );

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <div className={styles.app}>
          <div className={styles.header}>
            <HeaderPart />
          </div>
          <div className={styles.router}>router</div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
