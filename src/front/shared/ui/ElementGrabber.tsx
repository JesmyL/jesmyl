import { contextCreator } from '#shared/lib/contextCreator';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

export const makeElementGrabber = <Value, OnDropReturn = void>(options?: {
  classNamePrefix?: string;
  showClassNameIndicator?: string;
  RootComponent?: FC;
  hiddenElementsCss: ReturnType<typeof css>;
}) => {
  const {
    classNamePrefix = `grabber-${('' + Math.random()).slice(2)}`,
    showClassNameIndicator = 'grabber-shown',
    hiddenElementsCss = `display: none;`,
    RootComponent = makeRoot<Value | undefined, BothValues<Value | undefined>>(
      `.${classNamePrefix}`,
      hiddenElementsCss,
      showClassNameIndicator,
    ),
  } = options ?? {};

  type GrabRender = (props: {
    onGrab: (value: Value | undefined) => void;
    className: string | und;
    grabbedValue: Value | undefined;
  }) => React.ReactNode;

  type DropRender = (props: {
    onDrop: (value: Value | undefined) => Promise<OnDropReturn>;
    className: string | und;
    grabbedValue: Value | undefined;
  }) => React.ReactNode;

  type StopRender = (props: {
    onStop: () => void;
    className: string | und;
    grabbedValue: Value | undefined;
  }) => React.ReactNode;

  type BothValues<Val> = { grabbedValue: Val; targetValue: Val };
  type OnDrop = (props: BothValues<Value>) => OnDropReturn;
  type BothSetter = Dispatch<SetStateAction<BothValues<Value | undefined>>>;

  const [UserOnDropContext, useUserOnDropContext] = contextCreator<OnDrop>((() => {}) as never);
  const accentStopClassName = 'grabber-accent-stop';
  const accentTargetClassName = 'grabber-accent-target';

  const initAccentedValues = {
    grabbedValue: undefined,
    targetValue: undefined,
  };

  const shownClassName = `${classNamePrefix} ${showClassNameIndicator}`;
  const [AccentedValuesStateCtx, useAccentedValuesStateCtx] = contextCreator<
    [BothValues<Value | undefined>, Dispatch<SetStateAction<BothValues<Value | undefined>>>]
  >([initAccentedValues, () => {}]);

  const makeGrabRenderProps = (
    grabbedValue: Value | undefined,
    setAccentedValues: BothSetter,
  ): Parameters<GrabRender>[0] => {
    return {
      onGrab: value => setAccentedValues(prev => ({ ...prev, grabbedValue: value })),
      className: grabbedValue === undefined ? shownClassName : classNamePrefix,
      grabbedValue,
    };
  };

  const makeDropRenderProps = (
    userOnDrop: OnDrop,
    grabbedValue: Value | undefined,
    targetValue: Value | undefined,
    value: Value | undefined,
    setAccentedValues: BothSetter,
  ): Parameters<DropRender>[0] => {
    return {
      onDrop: async () => {
        if (grabbedValue === undefined || value === undefined) throw '';

        const result = userOnDrop({ grabbedValue, targetValue: value });

        if (result instanceof Promise) {
          setAccentedValues(prev => ({ ...prev, targetValue: value }));
          await result;
        }

        setAccentedValues(initAccentedValues);
        return result;
      },
      className: `${targetValue !== undefined && targetValue === value ? `${accentTargetClassName} ` : ''}${grabbedValue !== undefined && grabbedValue !== value ? shownClassName : classNamePrefix}`,
      grabbedValue,
    };
  };

  const makeStopRenderProps = (
    grabbedValue: Value | undefined,
    value: Value | undefined,
    setAccentedValues: BothSetter,
  ): Parameters<StopRender>[0] => {
    return {
      onStop: () => {
        setAccentedValues(initAccentedValues);
      },
      className: `${grabbedValue !== undefined && grabbedValue === value ? `${accentStopClassName} ` : ''}${grabbedValue !== undefined && grabbedValue === value ? shownClassName : classNamePrefix}`,
      grabbedValue,
    };
  };

  return {
    Root: (props: { onDrop?: OnDrop; children: React.ReactNode }) => {
      const accentedValuesState = useState<BothValues<Value | undefined>>(initAccentedValues);

      return (
        <UserOnDropContext value={props.onDrop ?? ((() => {}) as never)}>
          <AccentedValuesStateCtx
            // eslint-disable-next-line react-hooks/exhaustive-deps
            value={useMemo(() => [accentedValuesState[0], accentedValuesState[1]], accentedValuesState)}
          >
            <RootComponent $accentedValues={accentedValuesState[0]}>{props.children}</RootComponent>
          </AccentedValuesStateCtx>
        </UserOnDropContext>
      );
    },

    Grab: ({
      value,
      render,
      renderDrop,
      renderStop,
    }: {
      value: Value | undefined;
      render: (props: { onGrab: (value: Value | undefined) => void; className: string | und }) => React.ReactNode;
      renderDrop?: DropRender;
      renderStop?: StopRender;
    }) => {
      const [{ grabbedValue, targetValue }, setAccentedValues] = useAccentedValuesStateCtx();
      const userOnDrop = useUserOnDropContext();

      return (
        <>
          {render(makeGrabRenderProps(grabbedValue, setAccentedValues))}
          {renderDrop?.(makeDropRenderProps(userOnDrop, grabbedValue, targetValue, value, setAccentedValues))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value, setAccentedValues))}
        </>
      );
    },

    Drop: ({
      render,
      value,
      renderStop,
    }: {
      value: Value | undefined;
      render: DropRender;
      renderStop?: StopRender;
    }) => {
      const [{ grabbedValue, targetValue }, setAccentedValues] = useAccentedValuesStateCtx();
      const userOnDrop = useUserOnDropContext();

      return (
        <>
          {render(makeDropRenderProps(userOnDrop, grabbedValue, targetValue, value, setAccentedValues))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value, setAccentedValues))}
        </>
      );
    },

    Stop: ({ render, value }: { value: Value | undefined; render: StopRender }) => {
      const [{ grabbedValue }, setAccentedValues] = useAccentedValuesStateCtx();

      return <>{render(makeStopRenderProps(grabbedValue, value, setAccentedValues))}</>;
    },
  };
};

const makeRoot = <Val, Both extends { grabbedValue: Val; targetValue: Val }>(
  classNamePrefix: string,
  hiddenElementsCss: ReturnType<typeof css>,
  showClassNameIndicator: string,
) => styled.div<{
  $accentedValues: Both;
}>`
  ${classNamePrefix}:not(.${showClassNameIndicator}) {
    ${hiddenElementsCss}
  }
`;
