import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

export const parseNumericArray = (value: TransformFnParams): number[] => {
  if (value.value == null || value.value === '') {
    return null;
  }

  let parsedArray: number[];
  if (value.value instanceof Array) {
    parsedArray = value.value.map(v => Number(v));
  } else {
    parsedArray = value.value.split(',').map(v => Number(v));
  }

  if (parsedArray.length === 0) {
    return null;
  }

  return parsedArray;
};
