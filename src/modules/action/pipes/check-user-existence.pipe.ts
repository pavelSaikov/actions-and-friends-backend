import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';
import { CreateActionDto } from '../dto';

@Injectable()
export class CheckUserExistencePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(action: CreateActionDto) {
    const isUserExists = !!(await this.userService.findOne(action.userId));

    if (!isUserExists) {
      throw new BadRequestException('User does not exist');
    }

    return action;
  }
}
