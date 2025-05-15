import {
  IsNotEmpty,
  IsIn,
  IsEmail,
  IsString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { IsPhoneNumber } from 'src/auth/dto/phone.validator';
import { IsCountry } from './address.validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsCountry()
  country: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  addresssId?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['sender', 'receiver'])
  type: 'sender' | 'receiver';
}

export type AddressType = {
  type: 'sender' | 'receiver';
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string; // Optional
  phone: string;
  city: string;
  state: string;
  country: string; // Must be a 2-character uppercase code (e.g., US, GB)
  postalCode: string;
  addresssId?: string; // Optional
};
