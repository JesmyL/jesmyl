import { contextCreator } from '#shared/lib/contextCreator';
import { BibleBroadcastTextMapBlock } from '../model/base';

export const [BibleAddressTextContext, useBibleAddressTextContext] = contextCreator('');
export const [BibleTextMapBlocksContentContext, useBibleTextMapBlocksContentContext] = contextCreator(
  <BibleBroadcastTextMapBlock[]>[],
);
