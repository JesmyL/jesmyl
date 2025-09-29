import { Atom, useAtomValue } from 'atomaric';
import { FC } from 'react';
import styled from 'styled-components';

export const makeElementGrabber = <Value, OnDropReturn = void>(
  grabbedValueAtom: Atom<Value>,
  options?: { classNamePrefix?: string; showClassNameIndicator?: string; RootComponent?: FC },
) => {
  const {
    classNamePrefix = `grabber-${('' + Math.random()).slice(2)}`,
    showClassNameIndicator = 'grabber-shown',
    RootComponent = styled.div`
      .${classNamePrefix} {
        &:not(.${showClassNameIndicator}) {
          display: none;
        }
      }
    `,
  } = options ?? {};

  type GrabRender = (props: {
    onGrab: typeof grabbedValueAtom.set;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;
  type DropRender = (props: {
    onDrop: (value: Value) => OnDropReturn;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;
  type StopRender = (props: {
    //
    onStop: () => void;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;

  const shownClassName = `${classNamePrefix} ${showClassNameIndicator}`;
  let userOnDrop: (props: { grabbedValue: Value; targetValue: Value }) => OnDropReturn = (() => {}) as never;

  const makeGrabRenderProps: (grabbedValue: Value) => Parameters<GrabRender>[0] = grabbedValue => {
    return {
      onGrab: grabbedValueAtom.set,
      className: grabbedValue == null ? shownClassName : classNamePrefix,
      grabbedValue,
    };
  };

  const makeDropRenderProps: (grabbedValue: Value, value: Value) => Parameters<DropRender>[0] = (
    grabbedValue,
    targetValue,
  ) => {
    return {
      onDrop: () => {
        grabbedValueAtom.reset();
        return userOnDrop({ grabbedValue, targetValue });
      },
      className: grabbedValue != null && grabbedValue !== targetValue ? shownClassName : classNamePrefix,
      grabbedValue,
    };
  };

  const makeStopRenderProps: (grabbedValue: Value, value: Value) => Parameters<StopRender>[0] = (
    grabbedValue,
    value,
  ) => {
    return {
      onStop: grabbedValueAtom.reset,
      className: grabbedValue != null && grabbedValue === value ? shownClassName : classNamePrefix,
      grabbedValue,
    };
  };

  return {
    Root: ({ children, onDrop }: { onDrop?: typeof userOnDrop; children: React.ReactNode }) => {
      userOnDrop = onDrop ?? ((() => {}) as never);

      return <RootComponent>{children}</RootComponent>;
    },
    Grab: ({
      value,
      render,
      renderDrop,
      renderStop,
    }: {
      value: Value;
      render: (props: { onGrab: typeof grabbedValueAtom.set; className: string | und }) => React.ReactNode;
      renderDrop?: DropRender;
      renderStop?: StopRender;
    }) => {
      const grabbedValue = useAtomValue(grabbedValueAtom);

      return (
        <>
          {render(makeGrabRenderProps(grabbedValue))}
          {renderDrop?.(makeDropRenderProps(grabbedValue, value))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value))}
        </>
      );
    },
    Drop: ({ render, value, renderStop }: { value: Value; render: DropRender; renderStop?: StopRender }) => {
      const grabbedValue = useAtomValue(grabbedValueAtom);

      return (
        <>
          {render(makeDropRenderProps(grabbedValue, value))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value))}
        </>
      );
    },
    Stop: ({ render, value }: { value: Value; render: StopRender }) => {
      const grabbedValue = useAtomValue(grabbedValueAtom);

      return <>{render(makeStopRenderProps(grabbedValue, value))}</>;
    },
  };
};
