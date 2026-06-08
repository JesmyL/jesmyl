import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { useConfirm } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { CmComOrderLine, TheCmComOrder } from '$cm/ext';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { OrderRepeats } from 'shared/api';
import { cmComOrderMakeRepeatPortalKey, makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { CmEditorTabComRepeatsCountButtonPanel } from './CountButtonPanel';

export const CmEditorTabComRepeats = ({ ccom }: { ccom: EditableCom }) => {
  const [start, setStart] = useState<IEditableComLineProps | null>(null);
  const [pos, setPos] = useState({ '--x': 0, '--y': 0 });
  const [isChordBlock, setIsChordBlock] = useState(false);
  const [isReadySetChordBlock, setIsReadySetChordBlock] = useState(false);
  const [flashCount, setFlashCount] = useState(2);
  const confirm = useConfirm();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCantRedact = !checkAccess('cm', 'COM_REP', 'U');

  const { linei: startLinei, wordi: startWordi, orderUnit: startOrd } = start || {};
  let startedFlashes = 0;
  let beforeFlashes = 0;
  let isInRegion = false;
  let isRegionEnds = false;

  const setField = useCallback(
    (ord?: EditableComOrder | nil, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => {
      if (isCantRedact || !ord) return;

      const repeats = { ...makeCmComOrderRepeatOrSelf(prevs), ...makeCmComOrderRepeatOrSelf(repeateds) };
      if (repeats['.'] === 0) delete repeats['.'];
      const keys = objectKeys(repeats);

      const value =
        (objectLength(keys) ? (objectLength(keys) === 1 && keys[0] === '.' ? repeats['.'] : repeats) : 0) ?? 0;

      cmEditComOrderClientTsjrpcMethods.setRepeats({
        ordw: ord.wid,
        comw: ccom.wid,
        value,
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
    <Content className={twMerge('relative', start != null && 'active', isCantRedact && 'disabled pointers-none')}>
      {ccom.orders?.map((ord, ordi) => {
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
                        line: '',
                        linei: 0,
                        linesLen: 0,
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
              chordHardLevel={3}
              com={ccom}
              ord={ord}
              ordi={ordi}
              asHeaderNode={({ node }) => {
                return (
                  <div className="flex items-center">
                    {node}
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
                                comw: ccom.wid,
                              });
                          }}
                        />
                      </>
                    ) : null}
                  </div>
                );
              }}
              asLineNode={props => {
                return (
                  <CmComOrderLine
                    {...props}
                    setWordClass={(props, wordi) => {
                      if (!start) return '';
                      const { wordCount, linei } = props;

                      const openers = ord.regions?.reduce(
                        (count: number, { startLinei, startWordi, startKey }) =>
                          count + +(linei === startLinei && wordi === startWordi && !(startKey || '').startsWith('~')),
                        0,
                      );
                      if (openers) {
                        if (!isInRegion) beforeFlashes++;
                        startedFlashes += isInRegion ? openers : 1;
                      }

                      const prevStarteds = startedFlashes;
                      const prevEnds = isRegionEnds;

                      const closers = ord.regions?.reduce(
                        (count, { finLinei, finWordi = wordCount - 1 }) =>
                          count + +(linei === finLinei && wordi === finWordi),
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
                        linei === startLinei &&
                        wordi === startWordi &&
                        startedFlashes + 1 === prevStarteds;

                      if (isLastInRange) isRegionEnds = true;

                      if (!isInRegion && ord === startOrd && linei === startLinei && wordi === startWordi)
                        isInRegion = true;

                      return isLastInRange ||
                        (isInRegion && (isLastInRange ? prevStarteds : startedFlashes) <= beforeFlashes && !prevEnds)
                        ? ''
                        : 'inactive-word';
                    }}
                    onClick={event => {
                      if (isCantRedact) return;

                      const wordiStr = (event.nativeEvent.composedPath() as HTMLSpanElement[])
                        .find(span => span?.hasAttribute('line-wordi'))
                        ?.getAttribute('line-wordi');

                      if (wordiStr == null) return;

                      const { linei, linesLen, wordCount } = props;

                      if (start == null || isChordBlock) {
                        setStart({ ...props, orderUnit: ord, wordi: +wordiStr });
                        setPos({ '--x': event.currentTarget.offsetLeft, '--y': event.currentTarget.offsetTop });
                        setIsChordBlock(false);
                      } else {
                        const nextLetter = ccom.getRegionNextLetter();
                        const [startDiap, finishDiap] =
                          startOrd === ord
                            ? startLinei === 0 &&
                              startWordi === 0 &&
                              linei === linesLen - 1 &&
                              +wordiStr === wordCount - 1
                              ? ['.']
                              : [
                                  `${startLinei}${startWordi ? `:${startWordi}` : ''}${
                                    startLinei === linei && !startWordi && wordCount - 1 === +wordiStr
                                      ? ''
                                      : `-${linei}${wordCount - 1 === +wordiStr ? '' : `:${wordiStr}`}`
                                  }`,
                                ]
                            : [
                                cmComOrderMakeRepeatPortalKey(startLinei, startWordi, nextLetter, true),
                                cmComOrderMakeRepeatPortalKey(+linei, +wordiStr, nextLetter, false),
                              ];

                        if (startDiap) setField(startOrd, { [startDiap]: flashCount }, startOrd?.repeats);

                        if (startOrd !== ord && finishDiap) {
                          setField(ord, { [finishDiap]: flashCount }, ord.repeats);
                        }

                        reset();
                      }
                    }}
                  />
                );
              }}
            />

            {!isCantRedact && start && start.orderUnit === ord && (
              <CmEditorTabComRepeatsCountButtonPanel
                flashCount={flashCount}
                isChordBlock={isChordBlock}
                ord={ord}
                pos={pos as never}
                setField={setField}
                setFlashCount={setFlashCount}
                start={start}
                startLinei={startLinei}
                startOrd={startOrd}
                startWordi={startWordi}
                reset={reset}
              />
            )}
          </div>
        );
      })}
    </Content>
  );
};

const Content = styled.div`
  [line-wordi] {
    cursor: pointer;

    &.inactive-word {
      pointer-events: none;
      color: grey;
    }
  }
`;
