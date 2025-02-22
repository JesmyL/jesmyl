import { mylib } from '#shared/lib/my-lib';
import { HTMLAttributes } from 'react';
import styled, { css, keyframes } from 'styled-components';

export const TheIconWrapper = ({
  withoutAnimation,
  ...attrs
}: HTMLAttributes<HTMLOrSVGElement> & { name: string; withoutAnimation?: boolean }) => {
  return (
    <StyledSvg
      {...attrs}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      $withoutAnimation={withoutAnimation}
    />
  );
};

export const StyledSvg = styled.svg<{ $withoutAnimation?: boolean }>`
  --icon-size: 24px;
  --icon-scale: 1;
  --icon-fill: var(--icon-color);
  --icon-stroke: var(--icon-color);

  scale: var(--icon-scale);
  width: var(--icon-size);
  min-width: var(--icon-size);
  max-width: var(--icon-size);
  height: var(--icon-size);
  min-height: var(--icon-size);
  max-height: var(--icon-size);

  ${props => !props.$withoutAnimation && props.theme.isCanPlayAnimations() && iconWrapperAnimation}
`;

const fillIconAnimation = keyframes`${css`
  to {
    stroke-dashoffset: 0;
  }
`}`;

const iconWrapperAnimation = css`
  path {
    --stroke-length: 80;
    stroke-dasharray: var(--stroke-length);
    stroke-dashoffset: var(--stroke-length);
    animation: ${fillIconAnimation} 1s ease forwards;
  }

  ${(() => {
    const parentArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = [];

    for (let i = 0; i < parentArr.length; i++) {
      const arr = parentArr.slice(0, parentArr[i] + 1);
      let nthChild = 1;

      while (arr.length) {
        const index = mylib.randomOf(0, arr.length - 1);
        const delay = arr[index] - 1;

        if (delay)
          result.push(css`
            &:has(:nth-child(${parentArr[i] + 1}):last-child) path:nth-child(${nthChild}) {
              animation-delay: ${delay / 10}s;
            }
          `);

        arr.splice(index, 1);
        nthChild++;
      }
    }

    return result;
  })()}
`;
