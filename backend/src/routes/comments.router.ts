import express from 'express';
import { getAllComments, getCommentById } from 'src/queries/comments-queries';

const app = express();

// Comments routing
const CommentsRouter = express.Router();
CommentsRouter.get('/', async function (req, res, next) {
  const result = await getAllComments();
  res.send(result);
});
CommentsRouter.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  const result = await getCommentById(id);
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});
export default CommentsRouter;
