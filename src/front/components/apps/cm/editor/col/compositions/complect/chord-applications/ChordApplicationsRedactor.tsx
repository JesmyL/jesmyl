import { styledHoverBind } from '#shared/lib/styled-utils';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { ChordVisibleVariant } from '@cm/Cm.model';
import { ComLine } from '@cm/col/com/line/ComLine';
import { Order } from '@cm/col/com/order/Order';
import { TheOrder } from '@cm/col/com/order/TheOrder';
import { cmComOrderClientInvocatorMethods } from '@cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { CmComOrderWid } from 'shared/api';
import { emptyArray } from 'shared/utils';
import styled, { css } from 'styled-components';
import { useEditableCcom } from '../../useEditableCcom';

const timeouts: PRecord<`${CmComOrderWid}/${number}`, TimeOut> = {};

export function ChordApplicationsRedactor() {
  const ccom = useEditableCcom();
  const [ordLinePositions, setLinePositions] = useState<PRecord<`${CmComOrderWid}/${number}`, number[]>>({});
  const [linesOnUpdateSet, setLinesOnUpdateSet] = useState<PRecord<CmComOrderWid, Set<number>>>({});

  const updateLinePositions = (ord: Order, linei: number, pos: number) => {
    const key = `${ord.wid}/${linei}` as const;
    const line = [...(ordLinePositions[key] ?? ord.positions?.[linei] ?? [])];

    if (line.includes(pos)) line.splice(line.indexOf(pos), 1);
    else line.push(pos);

    line.sort((a, b) => a - b);

    setLinePositions(prev => ({
      ...prev,
      [key]: line,
    }));
    setLinesOnUpdateSet(prev => {
      const news = { ...prev };
      news[ord.wid] ??= new Set();
      news[ord.wid]?.add(linei);
      return news;
    });

    const textLines = (ord.text || '').split('\n');

    clearTimeout(timeouts[key]);
    timeouts[key] = setTimeout(async () => {
      try {
        await cmComOrderClientInvocatorMethods.setPositionsLine(
          null,
          ord.com.wid,
          ord.me.header(),
          ord.wid,
          linei,
          line,
          textLines[linei],
        );
      } catch (_e) {
        //
      }

      delete timeouts[key];
      setLinePositions(prev => {
        const linePositions = { ...prev };
        delete linePositions[key];
        return linePositions;
      });
      setLinesOnUpdateSet(prev => {
        const news = { ...prev };
        news[ord.wid] ??= new Set();
        news[ord.wid]?.delete(linei);
        return news;
      });
    }, 5000);
  };

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
}

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
