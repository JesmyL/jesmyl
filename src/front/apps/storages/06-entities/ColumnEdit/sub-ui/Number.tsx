import { StoragesNumberColumnMetricSelector } from '$storages/entities/NumberColumnMetricSelector';
import { StoragesColumnEditTypeProps } from '$storages/shared/model/model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeNumber = (props: StoragesColumnEditTypeProps<StoragesColumnType.Number>) => {
  return (
    <div className="flex gap-3">
      Единица измерения:
      <StoragesNumberColumnMetricSelector {...props} />
    </div>
  );
};
