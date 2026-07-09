import crypto from 'crypto';
import { lazyEnvJson } from './envJson';

const algorithm = 'aes-256-ctr';
const hashAlg = 'sha256';
const strEnc = 'hex';
const valEnc = 'utf8';

declare const secureBrand: unique symbol;
export type JsonSecureString<T> = string & { readonly [secureBrand]: T };

export const jsonStringifySecure = <Val>(val: Val, password = lazyEnvJson().SECURE_KEY) => {
  const json = JSON.stringify(val);

  const key = crypto.createHash(hashAlg).update(password).digest();
  const cipher = crypto.createCipheriv(algorithm, key, key.subarray(0, 16));

  return (cipher.update(json, valEnc, strEnc) + cipher.final(strEnc)) as JsonSecureString<Val>;
};

export const jsonParseSecure = <T>(hex: JsonSecureString<T>, password = lazyEnvJson().SECURE_KEY) => {
  const key = crypto.createHash(hashAlg).update(password).digest();
  const decipher = crypto.createDecipheriv(algorithm, key, key.subarray(0, 16));

  return JSON.parse(decipher.update(hex, strEnc, valEnc) + decipher.final(valEnc)) as T;
};
