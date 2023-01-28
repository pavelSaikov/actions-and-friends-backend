import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Action } from './dto';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionService {
  constructor(@InjectModel(Action.name) private actionModel: Model<Action>) {}

  async create(createActionDto: CreateActionDto) {
    const createdAction = new this.actionModel(createActionDto);
    return createdAction.save();
  }

  findAll() {
    return this.actionModel.find();
  }

  findAllByUserId(userId: string) {
    return this.actionModel.find({ userId });
  }

  findOne(id: string) {
    return this.actionModel.findById(id);
  }

  async update(id: string, updateActionDto: UpdateActionDto) {
    await this.actionModel.updateOne({ _id: id }, updateActionDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const action = this.findOne(id);

    if (action) {
      return this.actionModel.deleteOne({ _id: id });
    }
  }
}
