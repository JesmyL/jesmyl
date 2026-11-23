type UserAuthName = {
  fio?: string;
  nick?: string;
  email?: string;
  login?: string;
};

export const takeUserAuthName = (auth: UserAuthName | nil) =>
  auth?.fio || auth?.nick || auth?.email || auth?.login || '';
