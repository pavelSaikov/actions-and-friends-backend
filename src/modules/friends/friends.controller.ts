import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';

import { FriendsService } from './friends.service';
import { FriendshipDto } from './dto';
import {
  CheckFriendshipExistencePipe,
  CheckUserAndFriendExistencePipe,
} from './pipes';
import { JwtAuthGuard } from '../auth';
import { RequestWithUser } from '../models';

@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  @UsePipes(CheckUserAndFriendExistencePipe, CheckFriendshipExistencePipe)
  create(@Body() newFriendshipDto: FriendshipDto) {
    return this.friendsService.create(newFriendshipDto);
  }

  @Get('')
  findAll(@Req() request: RequestWithUser) {
    return this.friendsService.findAllFriends(request.user.id);
  }

  @Get(':friendId')
  isFriends(
    @Req() request: RequestWithUser,
    @Param('friendId') friendId: string,
  ) {
    return this.friendsService.isFriends(request.user.id, friendId);
  }

  @Delete('/user')
  removeAllUserFriendships(@Req() request: RequestWithUser) {
    return this.friendsService.removeUserFriendships(request.user.id);
  }

  @Delete(':friendId')
  removeFriendship(
    @Param('friendId') friendId: string,
    @Req() request: RequestWithUser,
  ) {
    return this.friendsService.removeById(request.user.id, friendId);
  }
}
