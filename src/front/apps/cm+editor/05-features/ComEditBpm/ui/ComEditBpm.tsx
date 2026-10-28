import { translateEditorBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { emptyFunc } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';

export const CmEditorComEditBpm = (props: { def: number | nil; onChange: (bpm: number) => Promise<unknown> }) => (
  <InputWithLoadingIcon
    icon="DashboardSpeed02"
    label={translateEditorBase(EditorLocaleKey.CmEditorBeatsPerMinute)}
    type="tel"
    defaultValue={'' + takeCorrectMetronomeBpm(props.def)}
    onChanged={value => props.onChange(+value)}
    onInput={emptyFunc}
  />
);
