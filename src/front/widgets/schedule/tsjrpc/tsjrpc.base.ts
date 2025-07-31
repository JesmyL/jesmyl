import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { indexIDB } from 'front/components/index/db/index-idb';

import { SchTsjrpcSharesModel } from 'shared/api';

export const schTsjrpcBaseClient = new (class SchTsjrpcBaseClient extends TsjrpcBaseClient<SchTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Sch',
      methods: {
        editedSchedule: async ({ sch }) => {
          if (sch.isRemoved) {
            await indexIDB.db.schs.where('w').equals(sch.w).delete();
          } else await indexIDB.db.schs.put(sch);

          indexIDB.updateLastModifiedAt(sch.m ?? sch.w);
        },
        refreshSchedules: async ({ schs }) => {
          for (const sch of schs) {
            if (sch.isRemoved) {
              await indexIDB.db.schs.where('w').equals(sch.w).delete();
            } else await indexIDB.db.schs.put(sch);
          }

          const schedules = await indexIDB.db.schs.toArray();
          const max = schedules.reduce((max, sch) => Math.max(max, sch.m ?? sch.w), 0);
          indexIDB.updateLastModifiedAt(max);
        },
      },
    });
  }
})();
