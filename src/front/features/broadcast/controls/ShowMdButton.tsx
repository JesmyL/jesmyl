import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { FunctionComponent, memo } from 'react';
import { takeIsCanShowTextBroadcastAtom } from '../atoms';

interface Props {
  Parent?: FunctionComponent<{ children: React.ReactNode; onClick?: Function; className?: string }>;
}

export const ScreenBroadcastControlPanelShowMdButton = memo(function ShowMdButton({ Parent }: Props) {
  const isCanShowTextBroadcast = useAtomValue(takeIsCanShowTextBroadcastAtom());

  const onClick = () => {
    takeIsCanShowTextBroadcastAtom().do.toggle();
  };

  if (Parent)
    return (
      <Parent
        onClick={onClick}
        className="pointer"
      >
        <LazyIcon
          icon="TvSmart"
          kind={isCanShowTextBroadcast ? 'SolidRounded' : undefined}
        />
      </Parent>
    );

  return (
    <LazyIcon
      icon="TvSmart"
      kind={isCanShowTextBroadcast ? 'SolidRounded' : undefined}
      onClick={onClick}
    />
  );
});
