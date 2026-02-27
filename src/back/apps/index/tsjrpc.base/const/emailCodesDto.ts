import { LocalSokiAuth } from 'shared/api';

export const emailCodesDto: PRecord<
  number,
  {
    auth: LocalSokiAuth | nil;
    email: string;
    expire: () => void;
  }
> = {};
