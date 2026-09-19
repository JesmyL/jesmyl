import styled from '@emotion/styled';

export const StyledBroadcastScreenProportioned = styled.div<{ $proportion: number }>`
  --prop: ${props => props.$proportion};
  width: min(100cqw, calc(100cqh * var(--prop)));
  height: min(100cqh, calc(100cqw / var(--prop)));
`;
