import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { emptyFunc } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';

export const CmEditorComEditBpm = (props: { def: number | nil; onChange: (bpm: number) => Promise<unknown> }) => (
  <InputWithLoadingIcon
    icon="DashboardSpeed02"
    label="Ударов в минуту"
    type="tel"
    defaultValue={'' + takeCorrectMetronomeBpm(props.def)}
    onChanged={value => props.onChange(+value)}
    onInput={emptyFunc}
  />
);
