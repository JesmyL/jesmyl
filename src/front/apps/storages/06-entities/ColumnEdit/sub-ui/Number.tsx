import { translateBase } from '#basis/locale';
import { StoragesNumberColumnMetricSelector } from '$storages/entities/NumberColumnMetricSelector';
import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeNumber = (props: StoragesColumnEditTypeProps<StoragesColumnType.Number>) => {
  return (
    <div className="flex gap-3">
      {translateBase(BaseLocaleKey.StoragesUnit)}
      <StoragesNumberColumnMetricSelector {...props} />
    </div>
  );
};
