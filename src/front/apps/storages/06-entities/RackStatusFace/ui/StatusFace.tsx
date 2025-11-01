import { Button } from '#shared/components/ui/button';
import { DropdownMenu } from '#shared/components/ui/dropdown-menu';
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
      items={(rackStatus.next ?? props.rack.statuses.map((_, i) => i)).map(status => {
        return cardStatusi === status
          ? null
          : {
              id: status,
              title: (
                <span
                  className="flex gap-2 max-w-[80vw]"
                  style={{ color: props.rack.statuses[status].color }}
                >
                  <LazyIcon icon={props.rack.statuses[status].icon ?? 'Cube'} />
                  <span className="ellipsis">{props.rack.statuses[status].title}</span>
                </span>
              ),
            };
      })}
      triggerNode={
        <DropdownMenu.Trigger className="flex gap-2">
          <>
            <Button
              asSpan
              icon={rackStatus.icon ?? 'Cube'}
              withoutAnimation
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
        </DropdownMenu.Trigger>
      }
    />
  );
};
