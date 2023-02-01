import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FriendshipDto } from './dto';
import { Friendship } from './schemas';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>,
  ) {}

  create(createFriendDto: FriendshipDto) {
    return this.friendshipModel.create(createFriendDto);
  }

  findAllFriends(userId: string) {
    return this.friendshipModel.find({ userId });
  }

  findAllFriendshipEntities(userId: string) {
    return this.friendshipModel.find({
      $or: [{ userId }, { friendId: userId }],
    });
  }

  async isFriends(userId: string, friendId: string) {
    const result = await this.friendshipModel.find({ userId, friendId });
    return !!(result && result.length);
  }

  update(userId: string, updateFriendDto: FriendshipDto) {
    return this.friendshipModel.updateOne({ _id: userId }, updateFriendDto);
  }

  removeUserFriendships(userId: string) {
    return Promise.all([
      this.friendshipModel.deleteMany({ userId }),
      this.friendshipModel.deleteMany({ friendId: userId }),
    ]);
  }

  async removeById(userId: string, friendId: string) {
    return this.friendshipModel.deleteOne({
      $and: [{ userId: { $eq: userId } }, { friendId: { $eq: friendId } }],
    });
  }
}
