import { IsBoolean, IsString } from 'class-validator';

import { IAction } from './IAction';

export class CreateActionDto implements Omit<IAction, 'id'> {
  @IsString()
  actionName: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  userId: string;
}
