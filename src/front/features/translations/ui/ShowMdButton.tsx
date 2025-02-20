import { LazyIcon } from '#shared/ui/icon';
import { FunctionComponent, memo } from 'react';
import { useIsCanShowTextTranslation } from '../lib/atoms';

interface Props {
  Parent?: FunctionComponent<any>;
}

export const ScreenTranslationControlPanelShowMdButton = memo(function ShowMdButton({ Parent }: Props) {
  const [isCanShowTextTranslation, setIsCanShowTextTranslation] = useIsCanShowTextTranslation();

  const onClick = () => {
    setIsCanShowTextTranslation(!isCanShowTextTranslation);
  };

  if (Parent)
    return (
      <Parent
        onClick={onClick}
        className="pointer"
      >
        <LazyIcon
          icon="TvSmart"
          kind={isCanShowTextTranslation ? 'SolidRounded' : 'StrokeRounded'}
        />
      </Parent>
    );

  return (
    <LazyIcon
      icon="TvSmart"
      kind={isCanShowTextTranslation ? 'SolidRounded' : 'StrokeRounded'}
      onClick={onClick}
    />
  );
});
