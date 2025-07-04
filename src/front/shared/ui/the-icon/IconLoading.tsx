import { HTMLAttributes } from 'react';
import { StameskaIconName } from 'stameska-icon';
import styled, { keyframes } from 'styled-components';
import { LazyIcon } from './LazyIcon';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  isLoading?: boolean;
  icon?: StameskaIconName;
}

export const TheIconLoading = (props: Props) => {
  const { isLoading, icon, ...attrs } = props;
  if (!('isLoading' in props))
    return (
      <StyledLoadingSpinner
        icon="Loading03"
        {...attrs}
      />
    );

  return isLoading ? (
    <StyledLoadingSpinner
      icon="Loading03"
      {...attrs}
    />
  ) : (
    <>
      {icon ? (
        <LazyIcon
          icon={icon}
          {...attrs}
        />
      ) : (
        props.children
      )}
    </>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoadingSpinner = styled(LazyIcon)<{ icon: 'Loading03' }>`
  animation: ${rotate} 1s linear infinite;
`;
