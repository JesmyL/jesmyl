import { useScreenTranslationBackgroundStyles } from '#features/translations/lib/hooks/background-styles';
import { AlertLineConfig } from '#features/translations/model/Configs.model';
import { theIconKnownPack } from '#shared/ui/icon/pack';
import styled, { css } from 'styled-components';

type Props = {
  config: AlertLineConfig;
  onClick?: () => void;
  isSelected?: boolean;
};

export default function AlertLineConfigIcon({ config, isSelected, onClick }: Props) {
  const Icon = theIconKnownPack[config.icon].StrokeRounded;
  const background = useScreenTranslationBackgroundStyles(config);

  return (
    <StypedIconContainer
      className="pointer"
      onClick={onClick}
      $color={config.color}
      $background={background}
      $isSelected={isSelected}
    >
      <Icon />
    </StypedIconContainer>
  );
}

const StypedIconContainer = styled.div<{ $color: string; $background: string | und; $isSelected: boolean | und }>`
  padding: 2px 5px;

  ${props => css`
    --icon-color: ${props.$color};
    background: ${props.$background};
    opacity: ${props.$isSelected ? '.5' : '1'};
  `}
`;
