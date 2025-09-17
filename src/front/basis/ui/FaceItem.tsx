import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

type Props = HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

export const FaceItem = ({ children, ...props }: Props) => {
  return (
    <StyledFaceItem
      {...props}
      className={twMerge('face-item', props.className)}
    >
      {children}
    </StyledFaceItem>
  );
};

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

  .face-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    height: 100%;
  }

  .face-wrapper,
  & {
    > .face-action {
      right: 0;
    }

    > .face-logo {
      border: solid 4px transparent;
      border-radius: 50%;
      background: var(--color--1);

      &.selected {
        border-color: var(--color--3);
      }
    }

    > .face-action,
    > .face-logo {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      width: var(--size);
      height: var(--size);
    }

    > .face-title {
      margin-left: calc(2.5em + 1em);
    }
  }

  .face-logo::after {
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
