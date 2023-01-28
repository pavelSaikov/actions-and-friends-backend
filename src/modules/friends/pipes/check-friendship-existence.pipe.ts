import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { FriendshipDto } from '../dto';
import { FriendsService } from '../friends.service';

@Injectable()
export class CheckFriendshipExistencePipe implements PipeTransform {
  constructor(private friendsService: FriendsService) {}

  async transform(newFriendshipDto: FriendshipDto) {
    const isFriends = await this.friendsService.isFriends(
      newFriendshipDto.userId,
      newFriendshipDto.friendId,
    );

    if (isFriends) {
      throw new BadRequestException('Friendship all ready exists');
    }

    return newFriendshipDto;
  }
}
