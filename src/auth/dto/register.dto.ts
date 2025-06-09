import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsPhoneNumber } from './phone.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail(undefined, {message: 'email not valid'})
  email: string;
  @IsNotEmpty()
  @MinLength(6, {message: 'password too short'})
  password: string;

  @IsNotEmpty()
  @MinLength(2, {message: 'firstName too short'})
  firstName: string;

  @IsNotEmpty()
  @MinLength(2, {message: 'lastName too short'})
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
