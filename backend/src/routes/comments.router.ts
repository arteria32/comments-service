import { CommentInstance } from '@models/comment';
import express from 'express';
import {
  deleteCommentById,
  getAllComments,
  getCommentById,
  insertNewComment,
  updateCommentById,
} from 'src/queries/comments-queries';

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

CommentsRouter.delete('/:id', async function (req, res, next) {
  const { id } = req.params;
  const result = await deleteCommentById(id);
  res.send(result);
});

CommentsRouter.post('/', async function (req, res, next) {
  const comment = CommentInstance.fromBodyRequest(
    req.body['objectId'],
    req.body['body'],
    req.body['userId'],
  );
  const response = await insertNewComment(comment);
  if (!response) {
    res.sendStatus(400);
  } else {
    res.send(response);
  }
});
CommentsRouter.put('/:id', async function (req, res, next) {
  const { id } = req.params;
  const comment = CommentInstance.fromBodyRequest(
    req.body['objectId'],
    req.body['body'],
    req.body['userId'],
  );
  const result = await updateCommentById(Number(id), comment);
  res.send(result);
});

export default CommentsRouter;
