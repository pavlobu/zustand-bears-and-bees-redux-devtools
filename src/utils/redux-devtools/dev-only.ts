import { isDevEnv } from './is-dev-env';

export const devOnly = (s: string): string | undefined => {
  if (isDevEnv) {
    return s;
  }
  return undefined;
};
