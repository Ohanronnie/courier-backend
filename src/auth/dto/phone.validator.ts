import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    try {
      const number = phoneUtil.parse(phoneNumber);
      return phoneUtil.isValidNumber(number);
    } catch {
      return false;
    }
  }

  defaultMessage() {
    return 'Invalid phone number';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberConstraint,
    });
  };
}
