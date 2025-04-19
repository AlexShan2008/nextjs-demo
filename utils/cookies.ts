import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

/**
 * This sets `cookie` using the `res` object
 */

type Options = {
  expires?: Date;
  maxAge?: number;
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: Options = {},
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    const maxAge = options.maxAge as number;
    options.expires = new Date(Date.now() + maxAge);
    options.maxAge = maxAge / 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};
