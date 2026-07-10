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
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(json, valEnc, strEnc) + cipher.final(strEnc);

  return `${iv.toString(strEnc)}:${encrypted}` as JsonSecureString<Val>;
};

export const jsonParseSecure = <T>(secureString: JsonSecureString<T>, password = lazyEnvJson().SECURE_KEY) => {
  const key = crypto.createHash(hashAlg).update(password).digest();
  const [ivHex, encrypted] = secureString.split(':', 2);
  const buffer = encrypted ? Buffer.from(ivHex, strEnc) : key.subarray(0, 16);
  const decipher = crypto.createDecipheriv(algorithm, key, buffer);

  return JSON.parse(decipher.update(encrypted || secureString, strEnc, valEnc) + decipher.final(valEnc)) as T;
};
