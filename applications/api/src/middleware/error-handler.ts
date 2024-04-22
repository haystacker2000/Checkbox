import { Request, Response } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: Function) {
    return res.status(500).send({ message: err.message });
  }