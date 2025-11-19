import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesDicti } from 'shared/model/storages/rack.model';

export const StoragesColumnCreateSelectDictionary = (props: {
  id: StoragesDicti;
  rack: StoragesRack;
  onSelectId: (id: StoragesDicti) => void;
}) => {
  const prompt = usePrompt();

  return (
    <Dropdown
      label="Словарь (неизменное значение)"
      id={props.id}
      items={props.rack.dicts
        .map((dict, dicti) => ({ id: dicti, title: <>{dict.title}</> }))
        .concat({
          id: -1,
          title: (
            <Button
              asSpan
              icon="PlusSign"
              onClick={async () => {
                const title = await prompt('Название для нового словаря', 'Новый словарь');
                if (!title) return;

                return storagesTsjrpcClient.createRackDict({ rackw: props.rack.w, title });
              }}
            >
              Новый словарь
            </Button>
          ),
        })}
      onSelectId={props.onSelectId}
    />
  );
};
