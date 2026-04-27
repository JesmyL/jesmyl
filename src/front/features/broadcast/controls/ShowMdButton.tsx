import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { takeIsCanShowTextBroadcastAtom } from '../atoms';

export const ScreenBroadcastControlPanelShowMdButton = memo(function ShowMdButton() {
  const isCanShowTextBroadcast = useAtomValue(takeIsCanShowTextBroadcastAtom());

  const onClick = () => {
    takeIsCanShowTextBroadcastAtom().do.toggle();
  };

  return (
    <LazyIcon
      icon="TvSmart"
      kind={isCanShowTextBroadcast ? 'SolidRounded' : undefined}
      onClick={onClick}
    />
  );
});
