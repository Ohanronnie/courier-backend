import {
  Controller,
  Post,
  HttpException,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { IResponse } from 'src/auth/auth.service';
import { PackagingDto } from './dtos/packaging.dto';
import { ParcelDto } from './dtos/parcel.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from 'src/address/address.controller';

@Controller('parcel')
@UseGuards(JwtAuthGuard)
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Post('/package/create')
  async createPackage(@Body() body: PackagingDto, @Req() req: Request & { user: UserType }): Promise<IResponse> {
    const response = await this.parcelService.createPackaging(body, req.user.id);
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
  @Post('/create')
  async createParcel(@Body() body: ParcelDto, @Req() req: Request & { user: UserType }): Promise<IResponse> {
    const response = await this.parcelService.createParcel(body,req.user.id);
    if (response.statusCode !== 201) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }
}
