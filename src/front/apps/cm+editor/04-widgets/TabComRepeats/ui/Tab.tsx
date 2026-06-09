import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { useConfirm } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrderLine, TheCmComOrder } from '$cm/ext';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { cmComOrderMakeRepeatPortalKey } from 'shared/utils/cm/repeat-keys';
import { twMerge } from 'tailwind-merge';
import { cmEditorTabComRepeatsStateAtom } from '../state/atoms';
import { CmEditorTabComRepeatsCountButtonPanel } from './CountButtonPanel';

export const CmEditorTabComRepeats = ({ ccom }: { ccom: EditableCom }) => {
  const [isReadySetChordBlock, setIsReadySetChordBlock] = useState(false);
  const confirm = useConfirm();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCantRedact = !checkAccess('cm', 'COM_REP', 'U');

  const { flashCount, isChordBlock, start, comw } = useAtomValue(cmEditorTabComRepeatsStateAtom);
  const { linei: startLinei, wordi: startWordi, ord: startOrd } = start || {};

  let startedFlashes = 0;
  let beforeFlashes = 0;
  let isInRegion = false;
  let isRegionEnds = false;

  useEffect(() => cmEditorTabComRepeatsStateAtom.do.reComw(ccom.wid), [ccom.wid]);

  useEffect(() => {
    if (isReadySetChordBlock) {
      cmEditorTabComRepeatsStateAtom.do.$setField(startOrd, flashCount);
      cmEditorTabComRepeatsStateAtom.reset();
      setIsReadySetChordBlock(false);
    }
  }, [flashCount, isReadySetChordBlock, startOrd]);

  return (
    comw === ccom.wid && (
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
                        cmEditorTabComRepeatsStateAtom.set(prev => ({
                          ...prev,
                          isChordBlock: true,

                          start: {
                            ord: ord,
                            line: '',
                            linei: 0,
                            linesLen: 0,
                            wordCount: 0,
                            wordi: 0,
                            words: [],
                          },

                          pos: {
                            '--x': event.currentTarget.clientLeft,
                            '--y': event.currentTarget.clientTop + 100,
                          },
                        }));
                      } else {
                        cmEditorTabComRepeatsStateAtom.set(prev => ({ ...prev, isChordBlock: false }));
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
                            count +
                            +(linei === startLinei && wordi === startWordi && !(startKey || '').startsWith('~')),
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
                          cmEditorTabComRepeatsStateAtom.set(prev => ({
                            ...prev,
                            isChordBlock: false,

                            start: { ...props, ord: ord, wordi: +wordiStr },

                            pos: { '--x': event.currentTarget.offsetLeft, '--y': event.currentTarget.offsetTop },
                          }));
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

                          if (startDiap)
                            cmEditorTabComRepeatsStateAtom.do.$setField(
                              startOrd,
                              { [startDiap]: flashCount },
                              startOrd?.repeats,
                            );

                          if (startOrd !== ord && finishDiap) {
                            cmEditorTabComRepeatsStateAtom.do.$setField(ord, { [finishDiap]: flashCount }, ord.repeats);
                          }

                          cmEditorTabComRepeatsStateAtom.reset();
                        }
                      }}
                    />
                  );
                }}
              />

              {!isCantRedact && start && start.ord === ord && <CmEditorTabComRepeatsCountButtonPanel ord={ord} />}
            </div>
          );
        })}
      </Content>
    )
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
