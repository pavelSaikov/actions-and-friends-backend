import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';
import { FriendshipDto } from '../dto';

@Injectable()
export class CheckUserAndFriendExistencePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(newFriendshipDto: FriendshipDto) {
    const [isUserExists, isFriendExists] = await Promise.all([
      !!(await this.userService.findOne(newFriendshipDto.userId)),
      !!(await this.userService.findOne(newFriendshipDto.friendId)),
    ]);

    if (!isUserExists || !isFriendExists) {
      throw new BadRequestException('User or friend does not exist');
    }

    return newFriendshipDto;
  }
}
