import { Request, Response, NextFunction } from 'express';

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
