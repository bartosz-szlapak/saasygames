import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

export const parseArray = (value: TransformFnParams): any[] => {
  if (value.value == null || value.value === '') {
    return null;
  }

  if (value.value instanceof Array) {
    return value.value;
  }

  const parsedArray = value.value.split(',');
  if (parsedArray.length === 0) {
    return null;
  }

  return parsedArray;
};
