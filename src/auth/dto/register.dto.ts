import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsPhoneNumber } from './phone.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}
