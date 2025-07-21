import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressType } from '../address/dtos/address.dto';
import { IResponse } from 'src/auth/auth.service';
import { axiosInstance } from 'src/utils/axios';
import { Address } from 'src/address/entities/address.entity';
import { RatesType } from './dtos/rates.dto';
import { ShipmentType } from './dtos/shipment.dto';
import { Shipment } from './entities/shipments.entity';
import { User } from 'src/users/entities/user.entity';
import { Parcel } from 'src/parcel/entities/parcel.entity';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,

    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async getRates(data: RatesType): Promise<IResponse> {
    try {
      const response = await axiosInstance.get('/rates/shipment', {
        params: {
          currency: data.currency,
          pickup_address: data.pickupAddress,
          delivery_address: data.deliveryAddress,
          parcel_id: data.parcelId,
        },
      });
      return {
        statusCode: response.status,
        message: 'Rates fetched successfully',
        data: response.data.data,
      };
    } catch (error) {
      console.error('Error creating address:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating address',
        error: 'Error creating address',
      };
    }
  }

  async createShipment(data: ShipmentType, userId: number): Promise<IResponse> {
    try {
      const response = await axiosInstance.post('/shipments', {
        pickup_address: data.pickupAddress,
        delivery_address: data.deliveryAddress,
        parcel_id: data.parcelId,
        shipment_purpose: data.shipmentPurpose,
        shipment_type: data.shipmentType,
      });
      const deliveryAddress = await this.addressRepository.findOne({
        where: { address_id: data.deliveryAddress },
      });
      const pickupAddress = await this.addressRepository.findOne({
        where: { address_id: data.pickupAddress },
      });
      const parcel = await this.parcelRepository.findOne({
        where: { parcelId: data.parcelId },
      });
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if(!deliveryAddress || !pickupAddress || !parcel || !user) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Address or parcel or user not found',
          error: 'Address or parcel or user not found', 
        };
      }
      const shipment = this.shipmentRepository.create({
        shipment_purpose: data.shipmentPurpose,
        shipment_type: data.shipmentType,
        pickup_address: pickupAddress,
        delivery_address: deliveryAddress,
        parcel: parcel,
        user: user,
        shipment_id: response.data.data.shipment_id,
      });
      await this.shipmentRepository.save(shipment);
      return {
        statusCode: response.status,
        message: 'Shipment created successfully',
        data: response.data.data,
      };
    } catch (error) {
      console.error('Error creating shipment:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating shipment',
        error: 'Error creating shipment',
      };
    }
  }
}
