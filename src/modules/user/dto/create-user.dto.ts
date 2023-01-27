import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

import { IUser } from './IUser';

export class CreateUserDto implements Omit<IUser, 'id' | 'rate'> {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  nickname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
