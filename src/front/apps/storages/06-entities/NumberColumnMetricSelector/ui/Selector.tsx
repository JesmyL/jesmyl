import { Button } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesNumberColumnMetricSelector = (props: StoragesColumnEditTypeProps<StoragesColumnType.Number>) => {
  const prompt = usePrompt();
  const maxCustomMetricLen = 7;
  const value = props.column.mt;

  const onSend = (mt: string) =>
    storagesTsjrpcClient.editColumnFields({
      coli: props.coli,
      data: { [StoragesColumnType.Number]: { mt } },
      rackw: props.rack.w,
      ...props.nestedSelectors,
    });

  const metrics = {
    '₽': 0,
    $: 0,

    шт: 0,

    м: 0,
    см: 0,
    км: 0,

    мин: 0,
    час: 0,
    сек: 0,

    лит: 0,
    мл: 0,
    куб: 0,

    кг: 0,
    г: 0,
    мг: 0,

    '€': 0,
    '£': 0,
  };

  return (
    <Dropdown
      id={value}
      nullTitle="-"
      hiddenArrow
      items={mylib
        .keys(metrics)
        .map(id => ({ id, title: id }) as { id: string; title: React.ReactNode })
        .concat(
          value && !(value in metrics) ? { id: value, title: <div className="text-x7 opacity-50">{value}</div> } : [],
        )}
      addContent={
        <Button
          onClick={async () => {
            const customMeter = await prompt(`Введи название измерения (максимум символов - ${maxCustomMetricLen})`);

            if (!customMeter) return;

            return onSend(customMeter.slice(0, maxCustomMetricLen));
          }}
        >
          Другое
        </Button>
      }
      onSelectId={onSend}
    />
  );
};
