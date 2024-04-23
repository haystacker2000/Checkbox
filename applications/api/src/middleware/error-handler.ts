import { Request, Response } from 'express';
import { HttpError } from '../errors/http-error.error';

export function errorHandler(err: Error | HttpError, req: Request, res: Response, next: Function) {
  console.error(err);
  if (err instanceof HttpError) return res.status(err.statusCode).send({ message: err.message });
  return res.status(500).send({ message: 'Internal server error' });
}
