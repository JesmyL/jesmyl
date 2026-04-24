export const enum EmailerAuthConfigKey {
  Self = 'first',
  Space = 'second',
  Official = 'official',
}

export type EmailerAuthConfig = {
  user: string;
  pass: string;
};

export type EmailerAuthConfigDict = PRecord<EmailerAuthConfigKey, EmailerAuthConfig>;
