import { HttpStatus, Injectable } from '@nestjs/common';
import { PackagingType } from './dtos/packaging.dto';
import { IResponse } from 'src/auth/auth.service';
import { axiosInstance } from 'src/utils/axios';

@Injectable()
export class PercelService {


  async createPackaging(data: PackagingType): Promise<IResponse> {
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
  
}
