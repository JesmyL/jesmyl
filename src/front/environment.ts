export type Environment = {
  isTest: boolean;
  sokiLink: string;
};

export const environment: Environment = {
  isTest: import.meta.env.DEV,
  sokiLink: import.meta.env.VITE_SOKI_LINK,
};
