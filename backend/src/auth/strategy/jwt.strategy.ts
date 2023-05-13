import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IUATPayload,
  ExtractedUAT,
} from 'src/common/interfaces/tokens.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'My random secret key never let others',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // @ts-expect-error cookies is not defined in Request
          const data = request?.cookies['auth-cookie'];

          if (!data) return null;

          return data.token;
        },
      ]),
    });
  }

  async validate(payload: IUATPayload | null): Promise<ExtractedUAT> {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, email: payload.email };
  }
}
