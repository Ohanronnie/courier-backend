import { Controller, Post, Body, HttpException, UseGuards, Request } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dtos/address.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request as Req } from 'express';
export type UserType =  {email: string, id:number};
@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/create')
  async createAddress(@Body() address: AddressDto, @Request() request: Req & { user: UserType } ): Promise<any> {
    const response = await  this.addressService.createAddress(address, request.user);
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
   }
    return response;
  }
}

