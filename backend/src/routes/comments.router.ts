import express from 'express';
import { getAllComments } from 'src/queries/comments-queries';

const app = express();

// Comments routing
const CommentsRouter = express.Router();
CommentsRouter.get('/', async function (req, res, next) {
  const result = await getAllComments();
  res.send(result);
});
export default CommentsRouter;
