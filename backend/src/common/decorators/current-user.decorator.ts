import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express-serve-static-core';
import { ExtractedUAT } from '../interfaces/tokens.interface';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): ExtractedUAT | undefined => {
    const req = context.switchToHttp().getRequest<Request>();

    // check if user equals a ExtractedUAT object
    if (req.user) {
      if (req.user.email && req.user.userId) {
        return req.user;
      }
    }

    return undefined;
  },
);
