import { registerDecorator, ValidationArguments } from 'class-validator';

const regex = new RegExp('[0-9]');

export const HasDigit = () => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasDigit',
      target: object.constructor,
      propertyName,
      validator: {
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${ propertyName }: value must contain at least 1 digit`;
        },
        validate(value: any) {
          if (value == null || typeof value !== 'string') {
            return false;
          }

          return regex.test(value);
        },
      },
    });
  };
};
