import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigKey } from 'src/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(ConfigKey.JwtSecret),
    });
  }

  async validate(payload: any) {
    const isExists = await this.userService.checkUserExistenceByIdAndEmail(
      payload.sub,
      payload.email,
    );

    return isExists ? { id: payload.sub, email: payload.email } : null;
  }
}
