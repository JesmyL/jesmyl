import crypto from 'crypto';

const jwtHeader = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url');

const remoteBroadcastJwtTtlSeconds = 12 * 60 * 60;

const sign = (secret: string, data: string) => crypto.createHmac('sha256', secret).update(data).digest('base64url');

export const signRemoteBroadcastJwt = (secret: string, deviceId: string, now = Date.now()) => {
  const iat = Math.trunc(now / 1000);
  const claims = Buffer.from(JSON.stringify({ sub: deviceId, iat, exp: iat + remoteBroadcastJwtTtlSeconds })).toString(
    'base64url',
  );
  const body = `${jwtHeader}.${claims}`;

  return `${body}.${sign(secret, body)}`;
};

export const verifyRemoteBroadcastJwt = (
  secret: string,
  token: string,
  deviceId: string,
  now = Date.now(),
): boolean => {
  const parts = token.split('.');

  if (parts.length !== 3) return false;

  const [header, claims, signature] = parts;
  if (header !== jwtHeader) return false;

  const expected = Buffer.from(sign(secret, `${header}.${claims}`));
  const input = Buffer.from(signature);

  if (input.length !== expected.length || !crypto.timingSafeEqual(input, expected)) return false;

  try {
    const payload: unknown = JSON.parse(Buffer.from(claims, 'base64url').toString('utf-8'));

    if (typeof payload !== 'object' || payload === null) return false;

    const { sub, exp } = payload as { sub?: unknown; exp?: unknown };

    return sub === deviceId && typeof exp === 'number' && exp > Math.trunc(now / 1000);
  } catch {
    return false;
  }
};
