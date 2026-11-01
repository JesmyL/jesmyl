import styled from '@emotion/styled';
import { HtmlHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export function BrutalScreen(props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>) {
  return (
    <Screen
      {...props}
      className={twMerge(
        'flex column custom-align-items my-5 rounded-[10px] bg-x2 pb-2.5 w-full h-full min-h-[120px] overflow-auto',
        props.className,
      )}
    >
      {props.children}
    </Screen>
  );
}

const Screen = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }

  > .title {
    margin: var(--main-5-gap);
  }

  > .item {
    margin-top: 10px;
    width: 100%;
    height: 30px;
  }
`;
