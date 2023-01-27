import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize, SerializeArray } from 'src/interceptors';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserDto)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SerializeArray(UserDto)
  @Get('nickname/:nick')
  findByNickname(@Param('nick') nickname: string) {
    return this.userService.findByNickname(nickname);
  }

  @Serialize(UserDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
    return id;
  }

  @Serialize(UserDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
