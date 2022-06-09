import { registerDecorator, ValidationArguments } from 'class-validator';

const regex = new RegExp('[A-Z]');

export const HasUppercase = () => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasUppercase',
      target: object.constructor,
      propertyName,
      validator: {
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${ propertyName }: value must contain at least 1 uppercase letter`;
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
