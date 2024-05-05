import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import styles from './App.module.scss';
import HeaderPart from './core/header/HeaderPart';
import routesConfig from './routes';
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
          <div className={styles.router}>
            <RouterProvider router={routesConfig} />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
