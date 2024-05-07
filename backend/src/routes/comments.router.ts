import CommentsController from '@controllers/comments-controller';
import { CommentInstance } from '@models/comment';
import express from 'express';

const app = express();
const commentController = new CommentsController();

// Comments routing
const CommentsRouter = express.Router();

CommentsRouter.get('/', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
    #swagger.description = 'Возвращает список всех параметров' */
  const result = await commentController.getAllComments();
  res.send(result);
});

CommentsRouter.get('/:id', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Возвращает комментарий по id'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID comment',
    required: true,
    type: 'integer'
}
 */
  const { id } = req.params;
  const result = await commentController.getCommentById(id);
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

CommentsRouter.delete('/:id', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Удаляет комментарий по id'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID comment',
    required: true,
    type: 'integer'
}
 */
  const { id } = req.params;
  const result = await commentController.deleteCommentById(id);
  res.send(result);
});

CommentsRouter.post('/', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Создает новый комментарий'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Комментарий',
            schema: {
                userId: 'Автор комментария',
                objectId: 'Объект комментария',
                body: 'Тело комментария'
            }
    } 
 */
  const comment = CommentInstance.fromBodyRequest(
    req.body['objectId'],
    req.body['body'],
    req.body['userId'],
  );
  const response = await commentController.addNewComment(comment);
  if (!response) {
    res.sendStatus(400);
  } else {
    res.send(response);
  }
});
CommentsRouter.put('/:id', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Обновляет комментарий'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Комментарий',
            schema: {
                userId: 'Автор комментария',
                objectId: 'Объект комментария',
                body: 'Тело комментария'
            }
    } 
 */
  const { id } = req.params;
  const comment = CommentInstance.fromBodyRequest(
    req.body['objectId'],
    req.body['body'],
    req.body['userId'],
  );
  const result = await commentController.updateComment(id, comment);
  res.send(result);
});

export default CommentsRouter;
