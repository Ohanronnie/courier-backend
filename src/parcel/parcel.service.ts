import { HttpStatus, Injectable } from '@nestjs/common';
import { PackagingType } from './dtos/packaging.dto';
import { IResponse } from 'src/auth/auth.service';
import { axiosInstance } from 'src/utils/axios';
import { ParcelDto, ParcelType } from './dtos/parcel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcel, ParcelItem } from './entities/parcel.entity';
import { Repository } from 'typeorm';
import { Packaging } from './entities/packaging.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Packaging)
    private readonly packagingRepository: Repository<Packaging>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    @InjectRepository(ParcelItem)
    private readonly parcelItemRepository: Repository<ParcelItem>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async createPackaging(data: PackagingType, userId: number): Promise<IResponse> {
    try {
      const response = await axiosInstance.post('/packaging', {
        height: data.height,
        width: data.width,
        length: data.length,
        weight: data.weight,
        name: data.name,
        type: data.type,
        size_unit: 'cm',
        weight_unit: 'kg',
      });
      const user = await this.userRepository.findOneBy({ id: userId });
      if(!user) 
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "User not found",
          data: null
        };
      const packaging = this.packagingRepository.create({
        height: data.height,
        width: data.width,
        length: data.length,
        weight: data.weight,
        name: data.name,
        type: data.type,
        size_unit: 'cm',
        weight_unit: 'kg',
        packaging_id: response.data.data.packaging_id,
        user
      });

      await this.packagingRepository.save(packaging);
      return {
        statusCode: response.status,
        message: 'Packaging created successfully',
        data: response.data.data.packaging_id,
      };
    } catch (error) {
      console.error('Error creating packaging:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating packaging',
        error: 'Error creating packaging',
      };
    }
  }
  async createParcel(data: ParcelType, userId: number): Promise<IResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if(!user) 
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "User not found",
          data: null
        };
      const _data = {
        description: data.description,
        weight_unit: 'kg',
        packaging: data.packagingId,
        user,
        items: data.items.map((item) => ({
          description: item.description,
          weight: item.weight,
          quantity: item.quantity,
          value: item.value,
          currency: item.currency,
          type: item.type,
          name: item.name,
        })),
      };
      const response = await axiosInstance.post('/parcels', _data);
      const parcelItem = this.parcelItemRepository.create(_data.items);
      await this.parcelItemRepository.save(parcelItem);

      const packaging = await this.packagingRepository.findOne({
        where: { packaging_id: data.packagingId },
      });
      if (!packaging) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Packaging not found',
          error: 'Packaging not found',
        };
      }
      const parcel = this.parcelRepository.create({
        description: data.description,
        items: parcelItem,
        packaging,
      });
      await this.parcelRepository.save(parcel);
      return {
        statusCode: response.status,
        message: 'Parcel created successfully',
        data: response.data.data.parcel_id,
      };
    } catch (error) {
      console.error('Error creating parcel:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating parcel',
        error: 'Error creating parcel',
      };
    }
  }
}
