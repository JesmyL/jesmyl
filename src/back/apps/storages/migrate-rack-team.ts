import { migrateLoginKeyedTeam } from 'back/apps/index/tinies/migrateLoginKeyedTeam';
import { StoragesRackMember, StoragesRackStorageSaved, StoragesRackWid } from 'shared/model/storages/list.model';
import { storagesDirStorage } from './file-stores';

type LegacyStoragesRackMember = StoragesRackMember & { fio?: string };

const migrateRackTeam = async (rack: StoragesRackStorageSaved) => {
  const { team, isMigrated } = await migrateLoginKeyedTeam(
    rack.team as never as PRecord<string, LegacyStoragesRackMember>,
    ({ role }) => ({ role }),
    `rack ${rack.w} "${rack.title}"`,
  );
  if (!isMigrated) return false;

  rack.team = team;

  return true;
};

export const takeMigratedRack = async (id: StoragesRackWid) => {
  const rack = storagesDirStorage.getItem(id);
  if (rack == null) return null;
  if (!(await migrateRackTeam(rack))) return rack;

  const migratedRack = { ...rack };
  storagesDirStorage.saveItem(id, migratedRack);

  return migratedRack;
};
