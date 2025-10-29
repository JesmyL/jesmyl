import { Button } from '#shared/components/ui/button';
import { MyLib } from '#shared/lib/my-lib';
import { ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesFieldType } from 'shared/model/storages/rack.model';

export const StoragesRackAddFieldModalInner = ({ rack }: { rack: StoragesRack }) => {
  const prompt = usePrompt();

  const typeDict: Record<StoragesFieldType, { typeTitle: string }> = {
    [StoragesFieldType.Date]: { typeTitle: 'Дата' },
    [StoragesFieldType.List]: { typeTitle: 'Список' },
  };

  return (
    <>
      <ModalHeader>Выберите тип нового поля</ModalHeader>
      <ModalBody className="flex flex-col gap-3 *:w-full">
        {MyLib.entries(typeDict).map(([type, { typeTitle }]) => {
          return (
            <Button
              key={type}
              onClick={async () => {
                const title = await prompt(`Название для нового поля с типом ${typeTitle}`);
                if (!title) return;
                return storagesTsjrpcClient.createRackField({ rackw: rack.w, title, type: +type });
              }}
            >
              {typeTitle}
            </Button>
          );
        })}
      </ModalBody>
    </>
  );
};
