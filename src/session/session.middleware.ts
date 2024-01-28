import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new HttpException('Missing bearer token', 401);

    const token: string = authorization.split(' ')[1];

    const decoded = verify(token, process.env.SECRET_KEY!);
    
    res.locals = { ...res.locals, decoded };

    return next();
  }
}
