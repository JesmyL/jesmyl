import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRack, StoragesRackWid } from 'shared/model/storages/list.model';

export const StoragesRackEditParentRackSelector = ({ rack }: { rack: StoragesRack }) => {
  const racks = useLiveQuery(() => storagesIDB.tb.racks.toArray(), []);

  if (rack.parent != null)
    return (
      <div className="mt-10 flex gap-2">
        Родительский стеллаж
        <span className="text-x7"> {racks?.find(r => r.w === rack.parent)?.title ?? 'неизвестен'}</span>
        <Link
          to="/storages/i/$rackw/edit"
          params={{ rackw: `${rack.parent}` }}
        >
          <Button icon="Edit02" />
        </Link>
      </div>
    );

  return (
    racks && (
      <div className="mt-10">
        <Dropdown<StoragesRackWid>
          label="Родительский стеллаж"
          items={racks.filter(rack => rack.parent == null).map(rack => ({ id: rack.w, title: rack.title }))}
          onSelectId={id => storagesTsjrpcClient.setRackAsParent({ parentRackw: id, rackw: rack.w })}
        />
        <div className="text-sm opacity-70">Это действие неизменно</div>
      </div>
    )
  );
};
