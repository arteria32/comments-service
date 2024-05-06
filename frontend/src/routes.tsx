import CommentViewerPage from 'pages/CommentViewerPage/CommentViewerPage';
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
  {
    path: '/comment/:id',
    Component: CommentViewerPage,
  },
]);

export default routesConfig;
