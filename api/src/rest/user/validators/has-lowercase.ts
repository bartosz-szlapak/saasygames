import { registerDecorator, ValidationArguments } from 'class-validator';

const regex = new RegExp('[a-z]');

export const HasLowercase = () => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasLowercase',
      target: object.constructor,
      propertyName,
      validator: {
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${ propertyName }: value must contain at least 1 lowercase letter`;
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
