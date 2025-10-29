import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { storagesRackCardStatusSelectorRackEditStatusiAtom } from '../state/atoms';

export const StoragesRackCardStatusSelector = ({ card, rack }: { card: StoragesRackCard; rack: StoragesRack }) => {
  const rackw = rack.w;
  const prompt = usePrompt();

  return (
    <>
      <Dropdown
        label="Статус"
        id={card.status || 0}
        items={rack.statuses.map((status, statusi) => {
          return {
            id: statusi,
            title: <StoragesRackStatusFace rackStatus={status} />,
          };
        })}
        onSelectId={statusi => storagesTsjrpcClient.setRackCardStatus({ rackw, statusi, cardMi: card.mi })}
        renderItem={({ node, id, afterClickAction }) => (
          <div className="flex justify-between w-full">
            {node}
            <Button
              icon="Settings01"
              onClick={event => {
                event.stopPropagation();
                storagesRackCardStatusSelectorRackEditStatusiAtom.set(id);
                afterClickAction();
              }}
            />
          </div>
        )}
        addContent={
          <Button
            icon="PlusSign"
            className="text-x7"
            onClick={async () => {
              const newStatusTitle = await prompt('Название нового статуса', 'Новый статус');
              if (!newStatusTitle) return;
              return storagesTsjrpcClient.createRackStatus({ rackw, title: newStatusTitle });
            }}
          >
            Новый статус
          </Button>
        }
      />
    </>
  );
};
