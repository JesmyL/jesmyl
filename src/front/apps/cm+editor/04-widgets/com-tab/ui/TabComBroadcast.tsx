import { translateBase } from '#basis/locale';
import { Button } from '#shared/components';
import { propsOfClicker } from '#shared/lib/clicker/propsOfClicker';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { WithAtom } from '#shared/ui/WithAtom';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmBroadcastCurrentNameSpaceiAtom, CmBroadcastShowNlNameSpaceSelector } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import React, { useMemo, useState } from 'react';
import {
  CmComLinei,
  CmComNewlinerSameiZero,
  CmComNewlinerWordi,
  CmComNewlinerWordiNewLine,
  CmComNewlinerWordiNotNewLine,
  CmComTextSquareBracketsMode,
} from 'shared/api';
import { CmBroadcastMonolineSlideOrdStrId, CmComNewlinerSymbolFreeUpperCaseLine } from 'shared/model/cm/broadcast';
import { incrementNumber, nagativeNumber } from 'shared/utils';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import { makeCmBroadcastMonolineSlideOrdLineStrId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { takeCmComNewlinerLineFullConfig } from 'shared/utils/cm/com/newliner';
import { squareBracketsReplacers } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { twMerge } from 'tailwind-merge';

export const CmEditorComTabComBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const nameSpacei = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);
  const com = useMemo(() => {
    if (nameSpacei) {
      //
    }
    return new EditableCom(ccom.top, null, null);
  }, [ccom.top, nameSpacei]);

  const targetHighlightMap = useState(() => new Map<Element, TimeOut>())[0];

  const { warns, slides, groups } = useMemo(() => {
    const slides = com.makeExpandSlides([nameSpacei], true);
    const warns: PRecord<CmBroadcastMonolineSlideOrdStrId, [className: string, text: string]> = {};

    let manyLinesLen;
    let maxLinesLen;
    let fewLinesLen;

    if (nameSpacei === 1) {
      manyLinesLen = 3;
      maxLinesLen = 2;
      fewLinesLen = 1;
    } else {
      manyLinesLen = 5;
      maxLinesLen = 4;
      fewLinesLen = 2;
    }

    slides.forEach(({ linei, lines, ord, repeati, samei }) => {
      const ordLineId = makeCmBroadcastMonolineSlideOrdLineStrId(ord.wid, linei, repeati, samei);

      if (lines.length > manyLinesLen) {
        warns[ordLineId] = ['text-x3 bg-xKO', translateBase(it => it.manyStrs)];
      } else if (lines.length > maxLinesLen) {
        warns[ordLineId] = ['text-x1 bg-x3 opacity-50', translateBase(it => it.maxStrsCount)];
      } else if (lines.length < fewLinesLen) {
        warns[ordLineId] = ['text-x3 bg-orange-500 opacity-60', translateBase(it => it.fewStrs)];
      }
    });

    return { warns, slides, groups: com.makeExpandGroupedLines() };
  }, [com, nameSpacei]);

  const upperLinesDict: PRecord<CmComNewlinerSymbolFreeUpperCaseLine, 1> = {};

  return (
    <React.Fragment key={nameSpacei}>
      <CmBroadcastShowNlNameSpaceSelector />
      <WithAtom init={false}>
        {openAtom => (
          <>
            <Button
              icon="Computer"
              onClick={openAtom.do.toggle}
            />
            <FullContent openAtom={openAtom}>
              {isOpen =>
                isOpen &&
                slides.map((slide, slidei) => (
                  <div
                    key={slidei}
                    className="my-5 white-pre"
                    {...makeCmComTextInnerHtmlProp(slide.text)}
                  />
                ))
              }
            </FullContent>
          </>
        )}
      </WithAtom>
      <div className="absolute pointers-none left-12 top-30 h-full w-53 bg-x2 opacity-25 z-0" />
      {groups.map((group, groupi) => {
        const firstGroup = group.at(0);
        let overLinesNode;

        if (firstGroup && !firstGroup.repeati && !firstGroup.ord.isAnyInherited) {
          const ord = firstGroup.ord;
          const ordNl = com.top.nl?.[nameSpacei]?.[ord.wid];
          const lineWholeConfigList = takeCmComNewlinerLineFullConfig(ordNl);
          const lines = ord.text.split('\n');

          if (lines.length < lineWholeConfigList.length)
            overLinesNode = lineWholeConfigList.map((lineConfig, lineConfigi) => {
              if (!lineConfig || lineConfigi < lines.length) return;

              return (
                <div key={lineConfigi}>
                  <Button
                    icon="Delete01"
                    className="bg-xKO! text-x3"
                    onClick={() =>
                      cmEditComClientTsjrpcMethods.removeNL_v1({
                        comw: com.wid,
                        ordw: ord.wid,
                        linei: lineConfigi as CmComLinei,
                        repeati: null,
                        spacei: nameSpacei,
                      })
                    }
                  >
                    {translateBase(it => it.cm.com.cnfStrN, { n: lineConfigi + 1 })}
                  </Button>
                </div>
              );
            });
        }

        return (
          <div
            key={groupi}
            className="mt-20"
          >
            {group?.map(({ line, ord, linei, repeati }, groupi) => {
              let samei = CmComNewlinerSameiZero;
              let prevLineId = '';

              const props = { 'solid-ord-selector': ord.wid };
              line = squareBracketsReplacers[CmComTextSquareBracketsMode.Remove](line);

              const invisibleOrdClassName = ord.isVisible ? '' : '*:line-through *:decoration-xKO *:decoration-2';

              if (ord.isChBlock() || !line.trim())
                return (
                  <div
                    key={groupi}
                    className={invisibleOrdClassName}
                    {...props}
                  >
                    {line}
                  </div>
                );

              const { currentSet, ownSet, firstSet, holdSet, upperLine } = ord.makeNewlinerSets(
                [nameSpacei],
                line,
                linei,
                repeati,
              );

              const isHasSelfChanges = !!ownSet.size;
              const isFirstLine = !upperLinesDict[upperLine];
              const isSameDigitsWithHolder =
                !isFirstLine && !firstSet && new Set([1]).union(holdSet.symmetricDifference(ownSet)).size === 1;

              const cloneSet = ownSet._clone();
              cloneSet.delete(CmComNewlinerWordiNewLine);
              cloneSet.delete(CmComNewlinerWordiNotNewLine);

              upperLinesDict[upperLine] = 1;

              const renderBreakButton = (wordi: CmComNewlinerWordi, isNeedHr?: boolean) => {
                let beforeNode;
                const neWordi = -wordi as CmComNewlinerWordi;

                if (currentSet.has(neWordi) || isNeedHr) {
                  const zeroOrdLineId = makeCmBroadcastMonolineSlideOrdLineStrId(
                    ord.wid,
                    linei,
                    repeati,
                    CmComNewlinerSameiZero,
                  );

                  if (prevLineId === zeroOrdLineId) samei = incrementNumber(samei, 1);
                  else samei = CmComNewlinerSameiZero;

                  prevLineId = zeroOrdLineId;
                  const ordLineId = makeCmBroadcastMonolineSlideOrdLineStrId(ord.wid, linei, repeati, samei);

                  beforeNode = (
                    <>
                      <div className={`my-3 h-1 ${currentSet.has(neWordi) && isNeedHr ? 'bg-xKO' : 'bg-x2'}`} />

                      {warns[ordLineId] && (
                        <div className={twMerge('mb-3 text-center', warns[ordLineId][0])}>{warns[ordLineId][1]}</div>
                      )}
                    </>
                  );
                }

                return (
                  <>
                    {beforeNode}
                    <Button
                      size="sx"
                      {...(currentSet.has(neWordi) && !firstSet?.size
                        ? {
                            icon: 'MinusSignCircle',
                            className: isSameDigitsWithHolder ? 'bg-xKO! text-x6' : 'text-x6',
                          }
                        : {
                            icon: 'PlusSignCircle',
                            className: isSameDigitsWithHolder ? 'bg-xKO! text-x6' : 'text-xOK',
                          })}
                      onClick={() =>
                        cmEditComClientTsjrpcMethods.switchNLBr_v1({
                          comw: com.wid,
                          ordw: ord.wid,
                          repeati,
                          linei,
                          wordi,
                          spacei: nameSpacei,
                        })
                      }
                    />
                  </>
                );
              };

              const words = line.split(' ');
              if (words.length === 1) words.push('#');

              return (
                <div
                  key={groupi}
                  upper-line={upperLine}
                  className={twMerge(
                    'mt-5',
                    invisibleOrdClassName,
                    repeati && '*:underline',
                    repeati > 1 && '*:decoration-double',
                  )}
                  {...props}
                >
                  {ord.isAnyInherited || !!linei || !!repeati || <div>{ord.me.header()}</div>}
                  {renderBreakButton(CmComNewlinerWordiNotNewLine, !groupi)}

                  {words.map((word, initWordi) => {
                    if (!initWordi)
                      return (
                        <Button
                          key={initWordi}
                          size="sx"
                          className={twMerge(
                            'bg-x2! has-[>svg]:px-0! px-0!',
                            isHasSelfChanges ? 'text-x8!' : 'text-x7!',
                            isFirstLine && 'underline decoration-double',
                          )}
                          {...(isHasSelfChanges
                            ? {
                                icon: 'Delete01',
                                onClick: () =>
                                  cmEditComClientTsjrpcMethods.removeNL_v1({
                                    comw: com.wid,
                                    ordw: ord.wid,
                                    linei,
                                    repeati,
                                    spacei: nameSpacei,
                                  }),
                              }
                            : isFirstLine
                              ? { icon: 'Play' }
                              : { icon: 'ArrowUpDouble' })}
                          {...(isFirstLine
                            ? null
                            : propsOfClicker({
                                onCtxMenu: event => {
                                  event.preventDefault();
                                  const elem = document.querySelector(`[upper-line='${upperLine}']`);
                                  const className = 'bg-x2!';

                                  if (elem) {
                                    clearTimeout(targetHighlightMap.get(elem));
                                    const timeout = setTimeout(() => elem.classList.remove(className), 2000);
                                    targetHighlightMap.set(elem, timeout);

                                    elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    elem.classList.add(className);
                                  }
                                },
                              }))}
                        >
                          <span {...makeCmComTextInnerHtmlProp(word)} />
                        </Button>
                      );

                    const wordi = (initWordi + 1) as CmComNewlinerWordi;
                    const neWordi = nagativeNumber(wordi);
                    const isHasAbsWordi = currentSet.has(wordi) || currentSet.has(neWordi);
                    cloneSet.delete(wordi);
                    cloneSet.delete(neWordi);

                    return (
                      <React.Fragment key={wordi}>
                        {isHasAbsWordi && (
                          <>
                            <br />
                            {renderBreakButton(wordi)}
                          </>
                        )}
                        <Button
                          size="sx"
                          icon={isHasAbsWordi ? 'SquareArrowMoveLeftUp' : 'SquareArrowMoveDownLeft'}
                          className={`has-[>svg]:px-0! px-0! ${isHasAbsWordi ? `${isSameDigitsWithHolder ? 'bg-xKO! text-x6!' : 'bg-x7! text-x1!'}${isHasSelfChanges ? '' : ' opacity-50!'}` : ''}`}
                          onClick={() =>
                            cmEditComClientTsjrpcMethods.switchNLWord_v1({
                              comw: com.wid,
                              linei,
                              repeati,
                              wordi,
                              ordw: ord.wid,
                              spacei: nameSpacei,
                            })
                          }
                        >
                          <span {...makeCmComTextInnerHtmlProp(word)} />
                        </Button>
                      </React.Fragment>
                    );
                  })}
                  {Array.from(cloneSet).map(wordi => (
                    <Button
                      key={wordi}
                      icon="Scissor01"
                      size="sx"
                      className="text-x3 bg-xKO!"
                      onClick={() =>
                        cmEditComClientTsjrpcMethods.switchNLWord_v1({
                          comw: com.wid,
                          ordw: ord.wid,
                          linei,
                          repeati,
                          wordi,
                          spacei: nameSpacei,
                        })
                      }
                    >
                      {wordi}
                    </Button>
                  ))}
                </div>
              );
            })}
            {overLinesNode}
          </div>
        );
      })}
    </React.Fragment>
  );
};
