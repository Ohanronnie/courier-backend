import { IsEmail, IsNotEmpty } from 'class-validator';
export interface ILoginUser {
  email: string;
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
