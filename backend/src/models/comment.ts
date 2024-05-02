import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

export class Comment {
  id: string;
  userId: string;
  objectId: string;
  body: string;
  createdAt?: string;
  modifedAt?: string;
  constructor(
    objectId: string,
    body: string,
    userId = 'undefined user',
    id = randomUUID(),
    createdAt?: string,
    modifedAt?: string,
  ) {
    this.id = id;
    this.objectId = objectId;
    this.body = body;
    this.userId = userId;
    if (dayjs(createdAt).isValid()) this.createdAt = dayjs(createdAt).toJSON();
    if (dayjs(modifedAt).isValid()) this.modifedAt = dayjs(modifedAt).toJSON();
  }
}
