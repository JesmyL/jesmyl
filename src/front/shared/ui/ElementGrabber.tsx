import { contextCreator } from '#shared/lib/contextCreator';
import { atom, useAtomValue } from 'atomaric';
import { FC } from 'react';
import { makeRegExp } from 'regexpert';
import styled, { css } from 'styled-components';

export const makeElementGrabber = <Value, OnDropReturn = void>(options?: {
  classNamePrefix?: string;
  showClassNameIndicator?: string;
  RootComponent?: FC;
  hiddenElementsCss: ReturnType<typeof css>;
}) => {
  const norm = (all: string) => `_${all.charCodeAt(0)}`;

  const {
    classNamePrefix = `grabber-${('' + Math.random()).slice(2)}`,
    showClassNameIndicator = 'grabber-shown',
    hiddenElementsCss = `display: none;`,
    RootComponent = styled.div<{
      $currentRootKey: number | string | undefined;
      $accentedValues: BothValues<Value | undefined>;
    }>`
      ${props => {
        return css`
          ${props.$accentedValues.grabbedValue === undefined || props.$accentedValues.targetValue === undefined
            ? css`
                .${classNamePrefix}:not(.${showClassNameIndicator}) {
                  ${hiddenElementsCss}
                }
              `
            : css`
                .${classNamePrefix}:not(.${accentTargetClassName}):not(.${accentStopClassName}) {
                  ${hiddenElementsCss}
                }

                .${accentStopClassName} {
                  pointer-events: none;
                }
              `}

          ${props.$currentRootKey !== undefined &&
          css`
            html &:not(.c-${props.$currentRootKey}) .${classNamePrefix} {
              ${hiddenElementsCss}
            }
          `}
        `;
      }}
    `,
  } = options ?? {};

  const accentStopClassName = 'grabber-accent-stop';
  const accentTargetClassName = 'grabber-accent-target';

  type GrabRender = (props: {
    onGrab: (value: Value) => void;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;

  type DropRender = (props: {
    onDrop: (value: Value) => Promise<OnDropReturn>;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;

  type StopRender = (props: {
    //
    onStop: () => void;
    className: string | und;
    grabbedValue: Value;
  }) => React.ReactNode;

  type BothValues<Val> = { grabbedValue: Val; targetValue: Val };
  type OnDrop = (props: BothValues<Value>) => OnDropReturn;

  const [UserOnDropContext, useUserOnDropContext] = contextCreator<OnDrop>((() => {}) as never);

  const shownClassName = `${classNamePrefix} ${showClassNameIndicator}`;
  const currentRootKeyAtom = atom<string | number | undefined>(undefined);
  const [RootCtx, useRootCtx] = contextCreator<number | string | undefined>(undefined);
  const accentedValuesAtom = atom<BothValues<Value>>({ grabbedValue: undefined!, targetValue: undefined! });

  const makeGrabRenderProps = (
    grabbedValue: Value,

    rootKey: string | number | undefined,
  ): Parameters<GrabRender>[0] => {
    return {
      onGrab: value => {
        currentRootKeyAtom.set(rootKey);
        accentedValuesAtom.do.setPartial({ grabbedValue: value });
      },
      className: grabbedValue === undefined ? shownClassName : classNamePrefix,
      grabbedValue,
    };
  };

  const makeDropRenderProps = (
    userOnDrop: OnDrop,
    grabbedValue: Value,
    targetValue: Value,
    value: Value,
  ): Parameters<DropRender>[0] => {
    return {
      onDrop: async () => {
        const result = userOnDrop({ grabbedValue, targetValue: value });

        if (result instanceof Promise) {
          accentedValuesAtom.do.setPartial({ targetValue: value });
          await result;
        }

        accentedValuesAtom.reset();
        currentRootKeyAtom.set(undefined);
        return result;
      },
      className: `${targetValue !== undefined && targetValue === value ? `${accentTargetClassName} ` : ''}${grabbedValue !== undefined && grabbedValue !== value ? shownClassName : classNamePrefix}`,
      grabbedValue,
    };
  };

  const makeStopRenderProps = (grabbedValue: Value, value: Value): Parameters<StopRender>[0] => {
    return {
      onStop: () => {
        currentRootKeyAtom.set(undefined);
        accentedValuesAtom.reset();
      },
      className: `${grabbedValue !== undefined && grabbedValue === value ? `${accentStopClassName} ` : ''}${grabbedValue !== undefined && grabbedValue === value ? shownClassName : classNamePrefix}`,
      grabbedValue,
    };
  };

  return {
    Root: ({ children, onDrop, uniqKey }: { onDrop?: OnDrop; children: React.ReactNode; uniqKey: string | number }) => {
      uniqKey = `${uniqKey}`.replace(makeRegExp('/[^-a-z0-9_]/g'), norm);
      const currentRootKey = useAtomValue(currentRootKeyAtom);
      const accentedValues = useAtomValue(accentedValuesAtom);

      return (
        <UserOnDropContext.Provider value={onDrop ?? ((() => {}) as never)}>
          <RootCtx.Provider value={uniqKey}>
            <RootComponent
              $accentedValues={accentedValues}
              $currentRootKey={currentRootKey}
              className={`c-${uniqKey}`}
            >
              {children}
            </RootComponent>
          </RootCtx.Provider>
        </UserOnDropContext.Provider>
      );
    },
    Grab: ({
      value,
      render,
      renderDrop,
      renderStop,
    }: {
      value: Value;
      render: (props: { onGrab: (value: Value) => void; className: string | und }) => React.ReactNode;
      renderDrop?: DropRender;
      renderStop?: StopRender;
    }) => {
      const { grabbedValue, targetValue } = useAtomValue(accentedValuesAtom);
      const userOnDrop = useUserOnDropContext();
      const rootKey = useRootCtx();

      return (
        <>
          {render(makeGrabRenderProps(grabbedValue, rootKey))}
          {renderDrop?.(makeDropRenderProps(userOnDrop, grabbedValue, targetValue, value))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value))}
        </>
      );
    },
    Drop: ({ render, value, renderStop }: { value: Value; render: DropRender; renderStop?: StopRender }) => {
      const { grabbedValue, targetValue } = useAtomValue(accentedValuesAtom);
      const userOnDrop = useUserOnDropContext();

      return (
        <>
          {render(makeDropRenderProps(userOnDrop, grabbedValue, targetValue, value))}
          {renderStop?.(makeStopRenderProps(grabbedValue, value))}
        </>
      );
    },
    Stop: ({ render, value }: { value: Value; render: StopRender }) => {
      return <>{render(makeStopRenderProps(useAtomValue(accentedValuesAtom).grabbedValue, value))}</>;
    },
  };
};
