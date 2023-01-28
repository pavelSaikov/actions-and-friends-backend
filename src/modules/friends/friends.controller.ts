import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';

import { FriendsService } from './friends.service';
import { FriendshipDto } from './dto';
import {
  CheckFriendshipExistencePipe,
  CheckUserAndFriendExistencePipe,
} from './pipes';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  @UsePipes(CheckUserAndFriendExistencePipe, CheckFriendshipExistencePipe)
  create(@Body() newFriendshipDto: FriendshipDto) {
    return this.friendsService.create(newFriendshipDto);
  }

  @Get(':userId')
  findAll(@Param('userId') id: string) {
    return this.friendsService.findAllFriends(id);
  }

  @Get(':userId/:friendId')
  isFriends(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return this.friendsService.isFriends(userId, friendId);
  }

  @Delete('/user/:userId')
  removeAllUserFriendships(@Param('userId') userId: string) {
    return this.friendsService.removeUserFriendships(userId);
  }

  @Delete(':id')
  removeFriendship(@Param('id') id: string) {
    return this.friendsService.removeById(id);
  }
}
