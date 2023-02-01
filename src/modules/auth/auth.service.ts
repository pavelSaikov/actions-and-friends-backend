import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return false;
    }

    const isPasswordsEqual = await this.userService.comparePasswordWithOriginal(
      user.password,
      password,
    );

    return isPasswordsEqual;
  }

  async login({ email }: { email: string }) {
    const user = await this.userService.getUserByEmail(email);

    const payload = { email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
