import omitBy from 'lodash.omitby';

export const omitEmpty = (obj: Record<string, any>) => {
  return omitBy(
    obj,
    (value) => value === null || value === undefined || value === ''
  );
};

export const converToNumber = (a: any, defaultValue = 0): number => {
  const numberA = Number(a);
  if (isNaN(numberA)) {
    return defaultValue;
  }
  return numberA;
};

export const noop = () => {};

export const omitParams = (params: Record<string, any>) =>
  Object.fromEntries(Object.entries(params).filter(([, v]) => !!v));
