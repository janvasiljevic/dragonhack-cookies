import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
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
      secretOrKey: 'todo',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const data = request?.cookies['auth'];

          if (!data) return null;

          return data;
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
