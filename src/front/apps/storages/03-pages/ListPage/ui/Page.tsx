import { Button } from '#shared/components/ui/button';
import { usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRack, StoragesRackWid } from 'shared/model/storages/list.model';
import { itNNull } from 'shared/utils';

export const StoragesListPage = () => {
  const prompt = usePrompt();
  const racks = useLiveQuery(() => storagesIDB.tb.racks.toArray());
  const rackChildren: PRecord<StoragesRackWid, StoragesRack[]> = {};

  const rackParents = racks
    ?.map(rack => {
      if (rack.parent == null) return rack;

      rackChildren[rack.parent] ??= [];
      rackChildren[rack.parent]?.push(rack);

      return null;
    })
    .filter(itNNull);

  const mapRackNode = (rack: StoragesRack) => {
    return (
      <div
        key={rack.w}
        className="my-3"
      >
        <Link
          to="/storages/i/$rackw"
          params={{ rackw: '' + rack.w }}
        >
          <Button icon={rack.icon ?? 'DeliveryBox01'}>{rack.title}</Button>
        </Link>
        {rackChildren[rack.w] && <div className="ml-5">{rackChildren[rack.w]?.map(mapRackNode)}</div>}
      </div>
    );
  };

  return (
    <PageContainerConfigurer
      className="StoragesListPage"
      headTitle="Склад"
      withoutBackButton
      head={
        <Button
          icon="Add02"
          onClick={async () => {
            const title = await prompt('Название стеллажа');
            if (!title) return;
            return storagesTsjrpcClient.createRack({ title });
          }}
        >
          Стеллаж
        </Button>
      }
      content={<>{rackParents?.map(mapRackNode)}</>}
    />
  );
};
