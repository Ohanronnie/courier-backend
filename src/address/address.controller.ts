import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dtos/address.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request as Req } from 'express';
export type UserType = { email: string; id: number };
@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) { }
  @Get('/countries')
  async getCountries(): Promise<any> {
    const response = await this.addressService.getCountries();
    if (response.statusCode !== 200) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
  @Get('/states')
  async getStates(
    @Request() request: Req,
  ): Promise<any> {
    const countryCode = request.query.countryCode as string;
    const response = await this.addressService.getStates(countryCode);
    if (response.statusCode !== 200) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
  @Get('/cities')
  async getCities(
    @Request() request: Req,
  ): Promise<any> {
    const { stateCode, countryCode } = request.query;
    const response = await this.addressService.getCities(
      stateCode as string,
      countryCode as string,
    );
    if (response.statusCode !== 200) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
  @Post('/create')
  async createAddress(
    @Body() address: AddressDto,
    @Request() request: Req & { user: UserType },
  ): Promise<any> {
    const response = await this.addressService.createAddress(
      address,
      request.user,
    );
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
}
