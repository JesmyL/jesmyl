const dns = 'jesmyl.ru' as const;

export const hosts = {
  dns,
  host: `https://${dns}` as const,
};
