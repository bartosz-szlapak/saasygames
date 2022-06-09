import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

export const numeric = (value: TransformFnParams): any => {
  if (value.value == null) {
    return value.value;
  }

  if (typeof value.value === 'number') {
    return value.value;
  }

  return Number(value.value);
}
