import { Button } from '#shared/components/ui/button';
import { usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

export const StoragesListPage = () => {
  const prompt = usePrompt();
  const racks = useLiveQuery(() => storagesIDB.tb.racks.toArray());

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
      content={
        <>
          {racks?.map(rack => {
            return (
              <div
                key={rack.w}
                className="my-3"
              >
                <Link
                  to="/storages/i/$rack"
                  params={{ rack: '' + rack.w }}
                >
                  <Button icon={rack.icon ?? 'DeliveryBox01'}>{rack.title}</Button>
                </Link>
              </div>
            );
          })}
        </>
      }
    />
  );
};
