import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class PackagingDto {
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(['box', 'envelope', 'soft-packaging'])
  type: 'box' | 'envelope' | 'pallet';

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}

export type PackagingType = {
  height: number;
  width: number;
  length: number;
  name: string;
  type: 'box' | 'envelope' | 'pallet';
  weight: number;
};
