import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { StoragesRackStatus } from 'shared/model/storages/list.model';

export const StoragesRackStatusFace = ({
  rackStatus,
  customTitile,
}: {
  rackStatus: StoragesRackStatus;
  customTitile?: React.ReactNode;
}) => {
  return (
    <span className="inline-flex gap-2">
      <LazyIcon
        icon={rackStatus.icon ?? 'Cube'}
        style={{ color: rackStatus.color }}
      />
      {customTitile || (
        <span
          className="font-bold"
          style={{ color: rackStatus.color }}
        >
          {rackStatus.title}
        </span>
      )}
    </span>
  );
};
