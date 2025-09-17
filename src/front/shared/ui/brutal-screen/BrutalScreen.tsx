import { HtmlHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

export function BrutalScreen(props: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>) {
  return (
    <Screen
      className="flex column custom-align-items"
      {...props}
    >
      {props.children}
    </Screen>
  );
}

const Screen = styled.div`
  --brutal-screen-gap-v: 20px;

  margin: var(--brutal-screen-gap-v) 0;
  border-radius: 10px;
  background-color: var(--color--2);
  padding-bottom: 10px;
  width: 100%;

  height: 100%;
  min-height: 120px;
  overflow: auto;

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
