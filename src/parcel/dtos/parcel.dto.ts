import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ParcelItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['document', 'parcel'])
  type: 'document' | 'parcel';

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
export class ParcelDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  packagingId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParcelItemDto)
  items: ParcelItemDto[];
}
export type ParcelType = {
  description?: string;
  packagingId: string;
  items: ParcelItemType[];
};
export type ParcelItemType = {
  description: string;
  name: string;
  type: 'document' | 'parcel';
  currency: string;
  quantity: number;
  weight: number;
  value: number;
};
