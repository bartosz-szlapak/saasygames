import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

export const parseBoolean = (value: TransformFnParams): boolean => {
  if (typeof value.value === 'boolean') {
    return value.value;
  }

  if (typeof value.value === 'string') {
    if (value.value === 'true') {
      return true;
    }
  }

  return false;
};
