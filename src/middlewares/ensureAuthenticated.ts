import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload{
  iat: number;
  expiration: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response:Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error(' JWT token is missing. ');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decode = verify(token, auth.jwt.secret);
    const { sub } = decode as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid Token JWT');
  }
}
