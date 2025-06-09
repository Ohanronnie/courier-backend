import { Injectable, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

import { Repository } from 'typeorm';
import { AddressType } from './dtos/address.dto';
import { IResponse } from 'src/auth/auth.service';
import { axiosInstance } from 'src/utils/axios';
import { UserType } from './address.controller';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createAddress(
    address: AddressType,
    user: UserType,
  ): Promise<IResponse> {
    try {
      console.log('Creating address:', address);
      const response = await axiosInstance.get('/countries');
      const countries: string[] = response.data.data.map((c: any) =>
        c.name.toLowerCase(),
      );

      let index = countries.findIndex(
        (country) => country === address.country.toLowerCase(),
      );
      let countryCode = response.data.data[index].isoCode;

      console.log('Country code:', countryCode);

      const stateResponse = await axiosInstance.get('/states', {
        params: { country_code: countryCode },
      });
      const states: string[] = stateResponse.data.data.map((s: any) =>
        s.name.toLowerCase(),
      );

      if (!states.includes(address.state.toLowerCase())) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'State is not valid',
          error: 'State is not valid',
        };
      }

      index = states.findIndex(
        (state) => state === address.state.toLowerCase(),
      );
      const stateCode: string = stateResponse.data.data[index].isoCode;

      console.log('State code:', stateCode);

      const cityResponse = await axiosInstance.get('/cities', {
        params: { state_code: stateCode, country_code: countryCode },
      });
      const cities: string[] = cityResponse.data.data.map((c: any) =>
        c.name.toLowerCase(),
      );

      if (!cities.includes(address.city.toLowerCase())) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'City is not valid',
          error: 'City is not valid',
        };
      }
      const addressResponse = await axiosInstance.post('/addresses', {
        first_name: address.firstName,
        last_name: address.lastName,
        country: countryCode,
        line1: address.addressLine1,
        line2: address.addressLine2,
        state: address.state,
        city: address.city,
        postal_code: address.postalCode,
        phone: address.phone,
      });
      const addressModel = this.addressRepository.create({
        first_name: address.firstName,
        last_name: address.lastName,
        email: address.email,
        address_line1: address.addressLine1,
        address_line2: address.addressLine2,
        phone: address.phone,
        city: address.city,
        state: address.state,
        country: countryCode,
        postal_code: address.postalCode,
        type: address.type,
        address_id: addressResponse.data.data.address_id,
      });
      await this.addressRepository.save(addressModel);

      const userModel = await this.userRepository.update(user.id, {
        address: addressModel,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Address created successfully',
        data: {
          addressId: addressResponse.data.data.address_id,
        },
      };
    } catch (error: any) {
      console.error('Error creating address:', error, error.response?.data);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: 'Internal server error',
      };
    }
  }
}
