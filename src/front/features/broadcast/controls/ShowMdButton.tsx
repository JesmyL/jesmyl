import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { FunctionComponent, memo } from 'react';
import { useIsCanShowTextBroadcast } from '../atoms';

interface Props {
  Parent?: FunctionComponent<{ children: React.ReactNode; onClick?: Function; className?: string }>;
}

export const ScreenBroadcastControlPanelShowMdButton = memo(function ShowMdButton({ Parent }: Props) {
  const [isCanShowTextBroadcast, setIsCanShowTextBroadcast] = useIsCanShowTextBroadcast();

  const onClick = () => {
    setIsCanShowTextBroadcast(!isCanShowTextBroadcast);
  };

  if (Parent)
    return (
      <Parent
        onClick={onClick}
        className="pointer"
      >
        <LazyIcon
          icon="TvSmart"
          kind={isCanShowTextBroadcast ? 'SolidRounded' : 'StrokeRounded'}
        />
      </Parent>
    );

  return (
    <LazyIcon
      icon="TvSmart"
      kind={isCanShowTextBroadcast ? 'SolidRounded' : 'StrokeRounded'}
      onClick={onClick}
    />
  );
});
