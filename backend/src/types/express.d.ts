import { Request as ExpressRequest } from 'express';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

declare module 'express-serve-static-core' {
  interface Request extends ExpressRequest {
    user?: ExtractedUAT;
  }
}
