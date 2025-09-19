import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

type Props = HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

export const FaceItem = {
  Root({ children, ...props }: Props) {
    return (
      <StyledFaceItem
        {...props}
        className={twMerge('face-item', props.className)}
      >
        {children}
      </StyledFaceItem>
    );
  },

  Logo({ children, ...props }: Props) {
    return (
      <StyledFaceLogo
        {...props}
        className={twMerge('face-logo', props.className)}
      >
        {children}
      </StyledFaceLogo>
    );
  },

  Title({ children, ...props }: Props) {
    return (
      <div
        {...props}
        className={twMerge('face-title ellipsis ml=[calc(2.5em+1em)]', props.className)}
      >
        {children}
      </div>
    );
  },
};

const StyledFaceLogo = styled.div`
  border: solid 4px transparent;
  border-radius: 50%;
  background: var(--color--1);
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: var(--size);
  height: var(--size);

  &.selected {
    border-color: var(--color--3);
  }

  &::after {
    display: flex;
    position: absolute;
    right: -0.3em;
    bottom: -0.4em;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--color--3);
    width: 1.3em;
    height: 1.3em;
    color: var(--color--2);
    font-size: 0.7em;
  }
`;

const StyledFaceItem = styled.div`
  --size: 2.5em;
  --logo-border-size: 2px;
  display: flex;

  position: relative;
  align-items: center;
  margin-bottom: calc(var(--logo-border-size) * 2 + 2px);
  padding: 0 0.4em;
  height: var(--size);

  &.current {
    font-weight: bold;
  }
`;
