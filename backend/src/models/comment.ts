import dayjs from 'dayjs';

export class CommentInstance {
  userId: string;
  objectId: string;
  body: string;
  constructor(objectId: string, body: string, userId = 'undefined user') {
    this.objectId = objectId;
    this.body = body;
    this.userId = userId;
  }
  static fromBodyRequest(
    objectId: string,
    body: string,
    userId = 'undefined user',
  ): CommentInstance {
    return new CommentInstance(objectId, body, userId);
  }
}
export class Comment extends CommentInstance {
  id: number;

  createdAt?: string;
  modifedAt?: string;
  constructor(
    objectId: string,
    body: string,
    userId = 'undefined user',
    id: number,
    createdAt?: string,
    modifedAt?: string,
  ) {
    super(objectId, body, userId);
    this.id = id;
    if (dayjs(createdAt).isValid()) this.createdAt = dayjs(createdAt).toJSON();
    if (dayjs(modifedAt).isValid()) this.modifedAt = dayjs(modifedAt).toJSON();
  }
}
