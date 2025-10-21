import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import styled, { css } from 'styled-components';
import { useScreenBroadcastBackgroundStyles } from '../../complect/hooks/background-styles';
import { AlertLineConfig } from '../../model';

type Props = {
  config: AlertLineConfig;
  onClick?: () => void;
  isSelected?: boolean;
};

export default function AlertLineConfigIcon({ config, isSelected, onClick }: Props) {
  const background = useScreenBroadcastBackgroundStyles(config);

  return (
    <StypedIconContainer
      className="pointer"
      onClick={onClick}
      $color={config.color}
      $background={background}
      $isSelected={isSelected}
    >
      <LazyIcon icon={config.icon} />
    </StypedIconContainer>
  );
}

const StypedIconContainer = styled.div<{ $color: string; $background: string | und; $isSelected: boolean | und }>`
  padding: 2px 5px;

  ${props => css`
    --icon-color: ${props.$color};
    color: ${props.$color};
    background: ${props.$background};
    opacity: ${props.$isSelected ? '.5' : '1'};
  `}
`;
