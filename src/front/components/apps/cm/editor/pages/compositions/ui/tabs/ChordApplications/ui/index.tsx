import { styledHoverBind } from '#shared/lib/styled-utils';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComLine } from '$cm/col/com/line/ComLine';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { emptyArray } from 'shared/utils';
import styled, { css } from 'styled-components';
import { useEditableCcom } from '../../../../lib/useEditableCom';
import { useUpdateLinePositions } from '../lib/useUpdateLinePositions';

export const CmChordApplicationsRedactorTab = () => {
  const ccom = useEditableCcom();
  const { updateLinePositions, linesOnUpdateSet, ordLinePositions } = useUpdateLinePositions();

  return (
    <Content className="chord-application-redactor">
      {ccom?.orders?.map((ord, ordi) => {
        if (!ord.isVisible) return null;
        const chords = ord.chords?.split('\n').map(line => line.split(' '));

        return (
          <TheOrder
            key={ordi}
            orderUnit={ord}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            com={ccom}
            orderUniti={ordi}
            asHeaderComponent={({ headerNode }) => {
              return (
                <div className="flex flex-gap">
                  {headerNode}
                  {!linesOnUpdateSet[ord.wid]?.size || <StyledLoadingSpinner icon="Loading03" />}
                </div>
              );
            }}
            asLineComponent={props => {
              const { com, textLine, textLinei } = props;
              const linePositions =
                ordLinePositions[`${ord.wid}/${textLinei}`] ?? ord.positions?.[textLinei] ?? emptyArray;
              const diffCount = (chords[textLinei]?.length || 0) - (linePositions?.length || 0);

              return (
                <div>
                  <div
                    className={`pre binder pointer${linePositions?.includes(-1) ? ' active' : ''}`}
                    onClick={() => updateLinePositions(ord, textLinei, -1)}
                  />
                  <ComLine
                    key={textLinei}
                    {...props}
                    chordedOrd
                    orderUnit={ord}
                    positions={linePositions}
                    com={com}
                    orderUniti={ordi}
                    isJoinLetters={false}
                    onClick={async event => {
                      const clicked = event.nativeEvent
                        .composedPath()
                        .find(span => (span as HTMLSpanElement)?.classList?.contains('com-letter')) as HTMLSpanElement;

                      const [, letteri] =
                        Array.from(clicked.classList)
                          .find(className => className.startsWith('letteri_'))
                          ?.split('_') || [];

                      if (letteri != null) {
                        updateLinePositions(ord, textLinei, +letteri);
                      }
                    }}
                  />
                  <div
                    className={'post binder pointer' + (linePositions?.includes(-2) ? ' active' : '')}
                    onClick={() => updateLinePositions(ord, textLinei, -2)}
                  />
                  <span
                    className={'margin-gap-h' + (diffCount < 0 ? ' pointer error-message' : '')}
                    onClick={() => {
                      ord.cutChordPositions(textLine, textLinei);
                    }}
                  >
                    {diffCount || ''}
                  </span>
                </div>
              );
            }}
          />
        );
      })}
    </Content>
  );
};

const Content = styled.div`
  max-width: 100vw;

  .composition-line {
    display: inline;
  }

  .binder {
    display: inline-block;
    vertical-align: middle;
    background-color: var(--color--2);
    width: 1em;
    height: 1em;

    &.active {
      background-color: var(--color--3);
    }

    &.pre {
      margin-right: 0.3em;
    }

    &.post {
      margin-left: 0.3em;
    }
  }

  .com-letter {
    cursor: pointer;

    ${styledHoverBind(css`
      background-color: var(--color--2);
    `)}

    &:before,
    &:after {
      font-size: 1em;
    }

    &.chorded:not(.pre) {
      > .fragment > * {
        display: inline-block;

        &.space-word {
          background-color: var(--color--ko);
        }

        &:first-letter {
          background-color: var(--color--ko);
        }
      }

      &:first-letter,
      &.spaced-word:after,
      &[attr-chord] > .fragment > *:first-letter {
        background-color: rgba(255, 209, 0, 0.3);
      }

      &[attr-chord].spaced-word > .fragment > *:first-letter {
        background-color: transparent;
      }
    }
  }
`;
