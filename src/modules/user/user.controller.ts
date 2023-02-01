import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize, SerializeArray } from 'src/interceptors';
import { UserDto } from './dto';
import { JwtAuthGuard } from '../auth';
import { RequestWithUser } from '../models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @SerializeArray(UserDto)
  @Get('nickname/:nick')
  findByNickname(@Param('nick') nickname: string) {
    return this.userService.findByNickname(nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get()
  async findOne(@Req() req: RequestWithUser) {
    const result = await this.userService.findOne(req.user.id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get(':id')
  async findOneById(@Param('id') id) {
    const result = await this.userService.findOne(id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async update(
    @Req() request: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.update(request.user.id, updateUserDto);
    return request.user.id;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async remove(@Req() request: RequestWithUser) {
    return this.userService.remove(request.user.id);
  }
}
