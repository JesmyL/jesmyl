const dns = 'jesmyl.ru' as const;

export const environment = {
  dns,
  host: `https://${dns}` as const,
};

export const isDevelopmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
