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
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { CheckUserExistencePipe } from './pipes';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  @UsePipes(CheckUserExistencePipe)
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionService.create(createActionDto);
  }

  @Get('/user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.actionService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionService.update(id, updateActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionService.remove(id);
  }
}
