export type EmailerAuthConfigKey = 'first' | 'second';

export type EmailerAuthConfig = {
  user: string;
  pass: string;
};

export type EmailerAuthConfigDict = PRecord<EmailerAuthConfigKey, EmailerAuthConfig>;
