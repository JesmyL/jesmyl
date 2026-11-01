import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { metronomeCurrentBpmAtom } from '../lib/atoms';

export const MetronomeBpmInput = memo(function MetronomeBpmInput() {
  const userBpm = useAtomValue(metronomeCurrentBpmAtom);

  return (
    <label className="flex gap-2 column my-5 max-w-[60px]">
      <LazyIcon
        icon="MinusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => metronomeCurrentBpmAtom.do.increment(-1)}
      />

      <TextInput
        className="w-[4em] text-center"
        type="tel"
        value={'' + userBpm}
        onInput={value => metronomeCurrentBpmAtom.set(+value)}
      />

      <LazyIcon
        icon="PlusSignCircle"
        kind="BulkRounded"
        className="pointer"
        onClick={() => metronomeCurrentBpmAtom.do.increment(1)}
      />
    </label>
  );
});
