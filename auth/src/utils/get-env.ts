import { FatalError } from '../errors';

export function getEnv(key: string, defaultValue?: string) {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new FatalError(`missing env variable ${key}`);
  }

  return value;
}
