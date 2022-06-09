import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validate as cvValidate } from 'class-validator';
import { iterate } from 'iterare';
import { BadRequestException, Injectable, ValidationError } from '@nestjs/common';

@Injectable()
export class ValidatorService {
  private readonly defaultValidatorOptions = {
    validationError: {target: false},
    forbidUnknownValues: true,
  };

  async validate<T extends object>(type: ClassConstructor<T>, data: object): Promise<T> {
    this.stripProtoKeys(data);
    const transformed = plainToClass(type, data);
    const errors = await cvValidate(transformed, this.defaultValidatorOptions);

    if (errors.length > 0) {
      throw new BadRequestException(this.flattenValidationErrors(errors));
    }

    return transformed;
  }

  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    return iterate(validationErrors)
      .map(error => this.mapChildrenToValidationErrors(error))
      .flatten()
      .filter(item => !!item.constraints)
      .map(item => Object.values(item.constraints))
      .flatten()
      .toArray();
  }

  protected mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    if (!(error.children && error.children.length)) {
      return [error];
    }
    const validationErrors = [];
    parentPath = parentPath
      ? `${ parentPath }.${ error.property }`
      : error.property;
    for (const item of error.children) {
      if (item.children && item.children.length) {
        validationErrors.push(
          ...this.mapChildrenToValidationErrors(item, parentPath),
        );
      }
      validationErrors.push(
        this.prependConstraintsWithParentProp(parentPath, item),
      );
    }
    return validationErrors;
  }

  protected prependConstraintsWithParentProp(
    parentPath: string,
    error: ValidationError,
  ): ValidationError {
    const constraints = {};
    // tslint:disable-next-line:forin
    for (const key in error.constraints) {
      constraints[key] = `${ parentPath }.${ error.constraints[key] }`;
    }
    return {
      ...error,
      constraints,
    };
  }


  private stripProtoKeys(value: Record<string, any>): void {
    delete value.__proto__;
    const keys = Object.keys(value);
    iterate(keys)
      .filter(key => typeof value[key] === 'object' && value[key])
      .forEach(key => this.stripProtoKeys(value[key]));
  }
}
