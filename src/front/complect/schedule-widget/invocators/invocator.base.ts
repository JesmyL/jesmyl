import { indexIDB } from 'front/components/index/db/index-idb';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { SchSokiInvocatorSharesMethods } from 'shared/api/invocators/schedules/invocators.shares.model';

let lastModifiedLocal: null | number = null;
export const setLastModifiedValue = async (lastModified: number) => {
  lastModifiedLocal ??= await indexIDB.getSingleValue('lastModified', 0);

  if (lastModifiedLocal >= lastModified) return;
  lastModifiedLocal = lastModified;

  indexIDB.setSingleValue('lastModified', lastModified);
};

class SchSokiInvocatorBaseClient extends SokiInvocatorBaseClient<SchSokiInvocatorSharesMethods> {}
export const schSokiInvocatorBaseClient = new SchSokiInvocatorBaseClient('SchSokiInvocatorBaseClient', {
  editedSchedule: () => async sch => {
    indexIDB.db.schs.put(sch);
    indexIDB.db.schs.where({ isRemoved: 1 }).delete();
    setLastModifiedValue(sch.m ?? sch.w);
  },
  freshSchedules: () => async schs => {
    indexIDB.db.schs.bulkPut(schs);
    indexIDB.db.schs.where({ isRemoved: 1 }).delete();
    const schedules = await indexIDB.db.schs.toArray();
    const max = schedules.reduce((max, sch) => Math.max(max, sch.m ?? sch.w), 0);
    setLastModifiedValue(max);
  },
});
