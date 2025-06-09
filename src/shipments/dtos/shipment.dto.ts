import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  parcelId: string;

  @IsNotEmpty()
  @IsIn([
    'commercial',
    'personal',
    'sample',
    'return-after-repair',
    'return-for-repair',
  ])
  shipmentPurpose:
    | 'commercial'
    | 'personal'
    | 'sample'
    | 'return-after-repair'
    | 'return-for-repair';

  @IsNotEmpty()
  @IsString()
  shipmentType: string;
}

export type ShipmentType = {
  pickupAddress: string;
  deliveryAddress: string;
  parcelId: string;
  shipmentPurpose:
    | 'commercial'
    | 'personal'
    | 'sample'
    | 'return-after-repair'
    | 'return-for-repair';
  shipmentType: string;
};
