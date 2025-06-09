import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class RatesDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'AED',
    'AUD',
    'CAD',
    'CNY',
    'EUR',
    'GBP',
    'GHS',
    'HKD',
    'KES',
    'NGN',
    'TZS',
    'UGX',
    'USD',
    'ZAR',
  ])
  currency: string;
  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  parcelId: string;
}

export class RatesType {
  deliveryAddress: string;
  pickupAddress: string;
  parcelId: string;
  currency: string;
}
