import { ThemeProvider } from "@gravity-ui/uikit";
import styles from "./App.module.scss";

const App = () => {
  return (
    <>
      <ThemeProvider theme="light">
        <div className={styles.app}>
          <div className={styles.header}>header</div>
          <div className={styles.router}>router</div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
