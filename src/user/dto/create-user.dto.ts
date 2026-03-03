/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Transform } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
