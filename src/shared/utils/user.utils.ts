import type { UserAuth } from 'shared/api/complect/soki.model';

export const takeUserAuthName = (auth: UserAuth | nil) =>
  auth?.fio || auth?.nick || auth?.email || auth?.login || '';
