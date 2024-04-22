import { Request } from 'express';

export function getUserIdFromRequest(req: Request): number {
    const userId = parseInt(req.params.userId);
    if (!Number.isInteger(userId)) throw new Error('Bad request');
    return userId;
  }