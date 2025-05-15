import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { axiosInstance as axios } from 'src/utils/axios';

@ValidatorConstraint({ async: true })
export class IsCountryConstraint implements ValidatorConstraintInterface {
  async validate(country: string, args: ValidationArguments): Promise<boolean> {
    try {
      // Example: Validate against an external API
      const response = await axios.get('/countries');
      const countries: string[] = response.data.data.map((c: any) =>
        c.name.toLowerCase(),
      );

      console.log('Countries:', countries);
      // Check if the provided country exists in the list
      return countries.includes(country.toLocaleLowerCase());
    } catch (error) {
      console.error('Error validating country:', error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `The country "${args.value}" is not valid.`;
  }
}

export function IsCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCountryConstraint,
    });
  };
}
