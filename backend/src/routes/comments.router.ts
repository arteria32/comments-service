import CommentsController from '@controllers/comments-controller';
import { CommentInstance } from '@models/comment';
import express from 'express';
import { parseDateRangeFromQueryParams } from 'shared/utils/parse-daterange-from-query';
import { transformToArray } from 'shared/utils/transform-to-array';

const commentController = new CommentsController();

// Comments routing
const CommentsRouter = express.Router();

CommentsRouter.get('/', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
    #swagger.description = 'Возвращает список всех параметров' */
  const result = await commentController.getAllComments();
  res.send(result);
});

CommentsRouter.get('/filter', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Возвращает Список комментариев по фильтрам. Список должнен удовлетворять ограничениям по каждому полю (AND). Можно добавлять несколько значений каждого поля.'
  #swagger.parameters['objectId'] = {
        in: 'query',                            
        description: 'Объкты комментария',                   
        type: 'string',                          
  }
  #swagger.parameters['userId'] = {
        in: 'query',                            
        description: 'Автор комментария',                   
        type: 'string',                          
}
  #swagger.parameters['from'] = {
        in: 'query',                            
        description: 'Начало интервала (дата последней модификации)',                   
        type: 'string',                          
}
  #swagger.parameters['to'] = {
        in: 'query',                            
        description: 'Конец интервала (дата последней модификации)',                   
        type: 'string',                          
}
 */
  const params = req.query;
  const filterUserId = transformToArray(params['userId']);
  const filterObjectId = transformToArray(params['objectId']);
  const dateRange = parseDateRangeFromQueryParams(params);
  const result = await commentController.getCommentsByFilter(
    filterUserId,
    filterObjectId,
    dateRange,
  );
  res.send(result);
});

CommentsRouter.get('/pages', async function (req, res, next) {
  /* 	#swagger.tags = ['Comments']
  #swagger.description = 'Возвращает страницы список комментариев.'
  #swagger.parameters['limit'] = {
        in: 'query',                            
        description: 'Количество элементов',    
        required:true,               
        type: 'integer',                          
  }
  #swagger.parameters['cursor'] = {
        in: 'query',                            
        description: 'id комментария после которого надо взять limit элементов',    
        required:true,                              
        type: 'integer',                          
  }
#swagger.responses[200] = {
            description: "В body хранятся все комментарии, в cursor-id последнего комментария из body",
        } 
 */
  const params = req.query;
  const limit = Number(params['limit']);
  const cursor = Number(params['cursor']);
  if (Number.isNaN(limit) || Number.isNaN(cursor)) {
    res.status(400).send('Incorrect type cursor or limit');
    return;
  }
  const result = await commentController.getCommentsByLimit(cursor, limit);
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
