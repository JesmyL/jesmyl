import { translateEditorBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components';
import { useConfirm } from '#shared/ui/modal';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { emptyFunc } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';

export const CmEditorComEditBpm = (props: {
  def: number | nil;
  onChange: (bpm: number) => Promise<unknown>;
  onRemove?: () => unknown;
  isRemovable?: boolean;
}) => {
  const confirm = useConfirm();

  return (
    <div className="flex items-center gap-3">
      {/* Поле BPM: показывает текущее (или дефолтное) значение, синхронизируется с ним через strongDefaultValue (чтобы сразу обновиться после удаления) и отправляет новое на сервер */}
      <InputWithLoadingIcon
        icon="DashboardSpeed02"
        label={translateEditorBase(EditorLocaleKey.CmEditorBeatsPerMinute)}
        type="tel"
        defaultValue={'' + takeCorrectMetronomeBpm(props.def)}
        strongDefaultValue
        onChanged={value => props.onChange(+value)}
        onInput={emptyFunc}
      />

      {/* Сброс BPM: кнопка с отступом под высоту поля видна только когда значение есть что сбрасывать и передан обработчик */}
      {!props.isRemovable || !props.onRemove || (
        <Button
          icon="Delete01"
          className="text-xKO mt-5"
          onClick={async () => {
            // Спрашиваем подтверждение; отказ — выходим, согласие — вызываем onRemove, который отправляет null
            if (
              !(await confirm(
                translateEditorBase(EditorLocaleKey.DeleteX, {
                  x: translateEditorBase(EditorLocaleKey.CmEditorBeatsPerMinute),
                }),
              ))
            )
              return;

            // Ждём onRemove, чтобы кнопка держала состояние загрузки до завершения удаления значения
            await props.onRemove?.();
          }}
        />
      )}
    </div>
  );
};
