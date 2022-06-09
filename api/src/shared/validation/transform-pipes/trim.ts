import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';

export const trim = (value: TransformFnParams): any => {
  if (value.value == null) {
    return null;
  }

  if (typeof value.value === 'string' || value.value instanceof String) {
    return value.value.trim();
  }

  try {
    return value.value.toString();
  } catch (e) {
    return undefined;
  }
};
