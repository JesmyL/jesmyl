type UserAuthName = {
  fio?: string | nil;
  nick?: string | nil;
  email?: string | nil;
  login?: string | nil;
};

export const takeUserAuthName = (auth: UserAuthName | nil) =>
  auth?.fio || auth?.nick || auth?.email || auth?.login || '';
