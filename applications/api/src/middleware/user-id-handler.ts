import { Request } from 'express';
import { HttpBadRequest } from '../errors/bad-request.error';

export function getUserIdFromRequest(req: Request): number {
    const userId = parseInt(req.params.userId);
    if (!Number.isInteger(userId)) throw new HttpBadRequest('Bad request');
    return userId;
  }