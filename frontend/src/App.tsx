import { ThemeProvider } from '@gravity-ui/uikit';
import styles from './App.module.scss';
import HeaderPart from './core/header/HeaderPart';

const App = () => {
  return (
    <>
      <ThemeProvider theme="light">
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
