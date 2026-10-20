import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';

export const CmEditorComEditBpm = (props: { def: number | nil; onChange: (bpm: number) => Promise<unknown> }) => (
  <InputWithLoadingIcon
    icon="DashboardSpeed02"
    label={translateBase(BaseLocaleKey.CmEditorBeatsPerMinute)}
    type="tel"
    defaultValue={'' + takeCorrectMetronomeBpm(props.def)}
    onChanged={value => props.onChange(+value)}
    onInput={emptyFunc}
  />
);
