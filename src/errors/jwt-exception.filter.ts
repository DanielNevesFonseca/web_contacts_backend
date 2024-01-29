// jwt-exception.filter.ts
import { Catch, Req, Next, Res } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch()
export class JwtExceptionFilter extends Error {

  catch(
    err: unknown,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (err instanceof JsonWebTokenError) {
      // Manipule exceções específicas aqui, se necessário.
      return res.status(401).json({ message: err.message });
    } else {
      // Tratamento padrão para outras exceções.
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
}
