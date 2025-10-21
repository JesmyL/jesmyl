import { useConfirm } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { ChordVisibleVariant, CmComOrderLine, TheCmComOrder } from '$cm/ext';
import { useCheckUserAccessRightsInScope } from '$index/useCheckUserAccessRightsInScope';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { OrderRepeats } from 'shared/api';
import styled from 'styled-components';
import { CmEditorComTabRepeatsRemoveButton } from '../sub-ui/ComRepeatsRemoveButton';

export const CmEditorComTabComRepeats = ({ ccom }: { ccom: EditableCom }) => {
  const [start, setStart] = useState<IEditableComLineProps | null>(null);
  const [pos, setPos] = useState({ '--x': 0, '--y': 0 });
  const [isChordBlock, setIsChordBlock] = useState(false);
  const [isReadySetChordBlock, setIsReadySetChordBlock] = useState(false);
  const [flashCount, setFlashCount] = useState(2);
  const confirm = useConfirm();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCantRedact = !checkAccess('cm', 'COM_REP', 'U');

  const { textLinei: startLinei, wordi: startWordi, orderUnit: startOrd } = start || {};
  let startedFlashes = 0;
  let beforeFlashes = 0;
  let isInRegion = false;
  let isRegionEnds = false;

  const setField = useCallback(
    (ord?: EditableComOrder | null, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => {
      if (isCantRedact || !ord) return;

      const reps = typeof prevs === 'number' ? { '.': prevs } : prevs || {};
      const repds = typeof repeateds === 'number' ? { '.': repeateds } : repeateds || {};
      const repeats = { ...reps, ...repds };
      const keys = Object.keys(repeats);
      if (repeats['.'] === 0) delete repeats['.'];

      const ordw = ord.me.isAnchorInherit ? (ord.me.leadOrd?.wid ?? ord.wid) : ord.wid;

      cmEditComOrderClientTsjrpcMethods.setRepeats({
        ordw,
        inhIndex: ord.me.anchorInheritIndex,
        orderTitle: ord.me.header(),
        comw: ccom.wid,
        value: (keys.length ? (keys.length === 1 && keys[0] === '.' ? repeats['.'] : repeats) : 0) ?? 0,
        textValue: ord.text
          ? ord.repeatedText(repeats).replace(makeRegExp('/&nbsp;/g'), ' ')
          : ord.me.header({ repeats: ord.repeatsTitle }),
      });
    },
    [ccom, isCantRedact],
  );

  const reset = useCallback(() => {
    setStart(null);
    setFlashCount(2);
    setIsChordBlock(false);
  }, []);

  useEffect(() => {
    if (isReadySetChordBlock) {
      setField(startOrd, flashCount);
      reset();
      setIsReadySetChordBlock(false);
    }
  }, [flashCount, isReadySetChordBlock, reset, setField, startOrd]);

  return (
    <Content
      className={`com-repeats-editor ${start == null ? '' : 'active'}${isCantRedact ? ' disabled pointers-none' : ''}`}
    >
      {ccom?.orders?.map((ord, ordi) => {
        if (!ord.isVisible) return null;

        return (
          <div
            key={ordi}
            className="region-editor-block relative"
            onClick={
              ord.text
                ? undefined
                : event => {
                    if (isCantRedact) return;
                    if (start == null || !isChordBlock) {
                      setStart({
                        orderUnit: ord,
                        textLine: '',
                        textLinei: 0,
                        textLines: 0,
                        wordCount: 0,
                        wordi: 0,
                        words: [],
                      });

                      setIsChordBlock(true);
                      setPos({
                        '--x': event.currentTarget.clientLeft,
                        '--y': event.currentTarget.clientTop + 100,
                      });
                    } else {
                      setIsChordBlock(false);
                      setIsReadySetChordBlock(true);
                    }
                  }
            }
          >
            <TheCmComOrder
              chordVisibleVariant={ChordVisibleVariant.None}
              com={ccom}
              ord={ord}
              ordi={ordi}
              asHeaderComponent={props => {
                return (
                  <div className="flex items-center">
                    {props.headerNode}
                    {ord.me.watchOrd ? (
                      <>
                        <LazyIcon
                          icon="LinkBackward"
                          className="align-middle pointer mx-2"
                          onClick={() => {
                            ord.me.watchOrd?.element?.scrollIntoView();
                          }}
                        />
                        <LazyIcon
                          icon="RowDelete"
                          className={`align-middle pointer ${ord.isInheritValue('r') ? 'disabled' : ''}`}
                          onClick={async () => {
                            const isClear = await confirm('Очистить собственные правила повторения?');

                            if (isClear)
                              cmEditComOrderClientTsjrpcMethods.clearOwnRepeats({
                                ordw: ord.wid,
                                orderTitle: ord.me.header(),
                                comw: ccom.wid,
                              });
                          }}
                        />
                      </>
                    ) : null}
                  </div>
                );
              }}
              asLineComponent={props => {
                return (
                  <CmComOrderLine
                    {...props}
                    setWordClass={(props, wordi) => {
                      if (!start) return '';
                      const { wordCount, textLinei } = props;

                      const openers = ord.regions?.reduce(
                        (count: number, { startLinei, startWordi, startKey }) =>
                          count +
                          +(textLinei === startLinei && wordi === startWordi && !(startKey || '').startsWith('~')),
                        0,
                      );
                      if (openers) {
                        if (!isInRegion) beforeFlashes++;
                        startedFlashes += isInRegion ? openers : 1;
                      }

                      const prevStarteds = startedFlashes;
                      const prevEnds = isRegionEnds;

                      const closers = ord.regions?.reduce(
                        (count, { endLinei, endWordi = wordCount - 1 }) =>
                          count + +(textLinei === endLinei && wordi === endWordi),
                        0,
                      );

                      if (closers) {
                        if (isInRegion) {
                          if (startedFlashes && startedFlashes === beforeFlashes) isRegionEnds = true;
                        } else beforeFlashes--;
                        startedFlashes -= closers;
                      }

                      const isLastInRange =
                        ord === startOrd &&
                        textLinei === startLinei &&
                        wordi === startWordi &&
                        startedFlashes + 1 === prevStarteds;

                      if (isLastInRange) isRegionEnds = true;

                      if (!isInRegion && ord === startOrd && textLinei === startLinei && wordi === startWordi)
                        isInRegion = true;

                      return isLastInRange ||
                        (isInRegion && (isLastInRange ? prevStarteds : startedFlashes) <= beforeFlashes && !prevEnds)
                        ? ''
                        : 'inactive-word';
                    }}
                    onClick={event => {
                      if (isCantRedact) return;

                      const wordiStr = (event.nativeEvent.composedPath() as HTMLSpanElement[])
                        .find(span => span?.hasAttribute('com-word-index'))
                        ?.getAttribute('com-word-index');

                      if (wordiStr == null) return;

                      const { textLinei: linei, textLines: lines, wordCount } = props;

                      if (start == null || isChordBlock) {
                        setStart({ ...props, orderUnit: ord, wordi: +wordiStr });
                        setPos({ '--x': event.currentTarget.offsetLeft, '--y': event.currentTarget.offsetTop });
                        setIsChordBlock(false);
                      } else {
                        const nextLetter = ccom.getRegionNextLetter();
                        const [startDiap, finishDiap] =
                          startOrd === ord
                            ? startLinei === 0 && startWordi === 0 && linei === lines - 1 && +wordiStr === wordCount - 1
                              ? ['.']
                              : [
                                  `${startLinei}${startWordi ? `:${startWordi}` : ''}${
                                    startLinei === linei && !startWordi && wordCount - 1 === +wordiStr
                                      ? ''
                                      : `-${linei}${wordCount - 1 === +wordiStr ? '' : `:${wordiStr}`}`
                                  }`,
                                ]
                            : [`${nextLetter}${startLinei}:${startWordi}`, `${linei}:${wordiStr}${nextLetter}`];

                        setField(startOrd, { [startDiap]: flashCount }, startOrd?.repeats);

                        if (startOrd !== ord) {
                          setField(ord, { [finishDiap || '']: flashCount }, ord.repeats);
                          ord.resetRegions();
                        }

                        startOrd?.resetRegions();

                        reset();
                      }
                    }}
                  />
                );
              }}
            />

            {!isCantRedact &&
              start &&
              start.orderUnit === ord &&
              (() => {
                const { orderUnit: startOrd, textLinei, wordi } = start;

                const flashes = (ord.regions || []).filter(
                  ({ startLinei, startWordi }) => startLinei === textLinei && startWordi === wordi,
                );

                return (
                  <div
                    className={`float-button-panel z-300${start && ord === start.orderUnit ? '' : ' hidden'}`}
                    style={pos as CSSProperties}
                  >
                    <div
                      className="button close pointer"
                      onClick={event => {
                        event.stopPropagation();
                        reset();
                      }}
                    >
                      <LazyIcon icon="Cancel01" />
                    </div>
                    {!flashes.length || (
                      <CmEditorComTabRepeatsRemoveButton
                        isChordBlock={isChordBlock}
                        ord={ord}
                        reset={reset}
                        setField={setField}
                        startOrd={startOrd}
                        textLinei={textLinei}
                        wordi={wordi}
                      />
                    )}
                    {[2, 3, 4, 5].map(currFlashCount => {
                      return (
                        <div
                          key={currFlashCount}
                          className={`button pointer numeric${flashCount === currFlashCount ? ' active' : ''}`}
                          onClick={() => setFlashCount(currFlashCount)}
                        >
                          {currFlashCount}
                        </div>
                      );
                    })}
                    {isChordBlock || (
                      <div
                        className="button flag pointer"
                        onClick={() => {
                          setField(startOrd, { [`~${startLinei}:${startWordi}`]: flashCount - 1 }, startOrd.repeats);
                          reset();
                        }}
                      >
                        <LazyIcon icon="Flag03" />
                      </div>
                    )}
                  </div>
                );
              })()}
          </div>
        );
      })}
    </Content>
  );
};

const Content = styled.div`
  position: relative;

  [com-word-index] {
    cursor: pointer;

    &.inactive-word {
      pointer-events: none;
      color: grey;
    }
  }

  .float-button-panel {
    --size: ${window.innerWidth / 2 / 7}px;

    position: absolute;
    display: flex;
    top: calc(var(--y) * 1px - var(--size) * 1.2);
    left: calc(var(--x) * 1px);
    transition: 0.5s;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      margin-left: 0.2em;
      border-radius: 0.3em;
      padding: 5px;

      width: var(--size);
      height: var(--size);

      &.close {
        --icon-color: var(--color--1);

        background: var(--color--6);
      }

      &.remove {
        --icon-color: white;

        background: var(--color--ko);
      }

      &.flag {
        --icon-color: var(--color--6);

        background: var(--color--2);
      }

      &.numeric {
        background: var(--color--3);
        color: var(--color--1);

        &.active {
          background: var(--color--7);
        }
      }
    }
  }
`;
