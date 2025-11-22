import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

export const StoragesRackStatusFace = (props: {
  rack: StoragesRack;
  statusi: number | nil;
  card: StoragesRackCard | null;
  customTitile?: React.ReactNode;
}) => {
  const cardStatusi = props.statusi ?? 0;
  const rackStatus = props.rack.statuses[cardStatusi];

  return (
    <Dropdown
      id={cardStatusi}
      onSelectId={
        props.card
          ? statusi => storagesTsjrpcClient.setRackCardStatus({ rackw: props.rack.w, statusi, cardMi: props.card!.mi })
          : undefined
      }
      items={(rackStatus.next ?? props.rack.statuses.map((_, i) => i)).map(statusIndex => {
        const status = props.rack.statuses[statusIndex];

        return cardStatusi === statusIndex
          ? null
          : {
              id: statusIndex,
              title: (
                <span
                  className="flex gap-2 max-w-[80vw]"
                  style={{ color: status.color }}
                >
                  <LazyIcon
                    icon={status.icon ?? 'Cube'}
                    style={{ color: status.color }}
                  />
                  <span className="ellipsis">{status.title}</span>
                </span>
              ),
            };
      })}
      triggerNode={isLoading => (
        <>
          <Button
            asSpan
            withoutAnimation
            isLoading={isLoading}
            icon={rackStatus.icon ?? 'Cube'}
            style={{ color: rackStatus.color }}
          />
          {props.customTitile || (
            <span
              className="font-bold"
              style={{ color: rackStatus.color }}
            >
              {rackStatus.title}
            </span>
          )}
        </>
      )}
    />
  );
};
