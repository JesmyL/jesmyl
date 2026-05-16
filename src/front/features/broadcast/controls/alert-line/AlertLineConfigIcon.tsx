import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { takeScreenBroadcastBackgroundStyles } from '../../complect/hooks/background-styles';
import { AlertLineConfig } from '../../model';

type Props = {
  config: AlertLineConfig;
  onClick?: () => void;
  isSelected?: boolean;
};

export default function AlertLineConfigIcon({ config, isSelected, onClick }: Props) {
  const background = takeScreenBroadcastBackgroundStyles(config);

  return (
    <StypedIconContainer
      className="pointer"
      onClick={onClick}
      $color={config.color}
      $bg={background}
      $sel={isSelected}
    >
      <LazyIcon icon={config.icon} />
    </StypedIconContainer>
  );
}

const StypedIconContainer = styled.div<{ $color: string; $bg: string | und; $sel: boolean | und }>`
  padding: 2px 5px;

  ${props => css`
    --icon-color: ${props.$color};
    color: ${props.$color};
    background: ${props.$bg};
    opacity: ${props.$sel ? '.5' : '1'};
  `}
`;
