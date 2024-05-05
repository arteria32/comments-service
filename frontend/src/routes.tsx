import { createBrowserRouter } from 'react-router-dom';
import CommentsListPage from './pages/CommentsListPage/CommentsListPage';

const routesConfig = createBrowserRouter([
  {
    path: '/',
    Component: CommentsListPage,
  },
  {
    path: '/comments',
    Component: CommentsListPage,
  },
]);

export default routesConfig;
