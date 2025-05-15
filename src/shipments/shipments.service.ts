import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressType } from '../address/dtos/address.dto';
import { IResponse } from 'src/auth/auth.service';
import { axiosInstance } from 'src/utils/axios';

@Injectable()
export class ShipmentsService {
}