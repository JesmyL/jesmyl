import { Button } from '#shared/components';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { WithAtom } from '#shared/ui/WithAtom';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import React, { useMemo } from 'react';
import { CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';
import { makeCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { takeTextBlockWithoutSquareBracketsContent } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { twMerge } from 'tailwind-merge';

export const CmEditorComTabComBroadcast = ({ ccom }: { ccom: EditableCom }) => {
  const { warns, slides, groups } = useMemo(() => {
    const slides = ccom.makeExpandSlides(false);
    const warns: PRecord<CmBroadcastMonolineSlideOrdId, [className: string, text: string]> = {};

    slides.forEach(({ linei, lines, ord, repeati, samei }) => {
      const ordLineId = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei);

      if (lines.length > 5) {
        warns[ordLineId] = ['text-x3 bg-xKO', 'Много строк'];
      } else if (lines.length > 4) {
        warns[ordLineId] = ['text-x1 bg-x3 opacity-50', 'Максимальное количество строк'];
      } else if (lines.length < 2) {
        warns[ordLineId] = ['text-x3 bg-orange-500 opacity-60', 'Мало строк'];
      }
    });

    return { warns, slides, groups: ccom.makeExpandGroupedLines(false) };
  }, [ccom]);

  return (
    <>
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
                    dangerouslySetInnerHTML={{ __html: slide.lines.join('\n') }}
                  />
                ))
              }
            </FullContent>
          </>
        )}
      </WithAtom>
      <div className="absolute pointers-none left-12 top-30 h-full w-53 bg-x2 opacity-25 z-0" />
      {groups.map((group, groupi) => (
        <div
          key={groupi}
          className="mt-20"
        >
          {group?.map(({ line, ord, linei, repeati }, ordBlocki) => {
            let samei = 0;
            let prevLineId = '';

            const props = { 'solid-ord-selector': ord.makeSelector() };
            line = takeTextBlockWithoutSquareBracketsContent(line);

            if (!ord.isRealText() || !line.trim())
              return (
                <div
                  key={ordBlocki}
                  {...props}
                >
                  {line}
                </div>
              );

            const { watchSet, currentSet, nearSet, ownSet } = ccom.makeNewlinerSet(ord, repeati, linei);
            const isHasSelfChanges = !!ownSet.size;
            const isDifferentDigitsWithNear = !nearSet || !!nearSet.symmetricDifference(ownSet).size;
            const cloneSet = ownSet._clone();
            cloneSet.delete(-1);
            cloneSet.delete(1);

            const renderBreakButton = (wordi: number, isNeedHr?: boolean) => {
              let beforeNode;

              if (currentSet.has(-wordi) || isNeedHr) {
                const zeroOrdLineId = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, 0);

                if (prevLineId === zeroOrdLineId) samei++;
                else samei = 0;
                prevLineId = zeroOrdLineId;
                const ordLineId = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei);

                beforeNode = (
                  <>
                    <div className={`my-3 h-1 ${currentSet.has(-wordi) && isNeedHr ? 'bg-xKO' : 'bg-x2'}`} />

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
                    {...(currentSet.has(-wordi) && !watchSet.size
                      ? {
                          icon: 'MinusSignCircle',
                          className: isDifferentDigitsWithNear ? 'text-x6' : 'bg-xKO! text-x6',
                        }
                      : {
                          icon: 'PlusSignCircle',
                          className: isDifferentDigitsWithNear ? 'text-xOK' : 'bg-xKO! text-x6',
                        })}
                    onClick={() =>
                      cmEditComClientTsjrpcMethods.switchNLBr({
                        comw: ccom.wid,
                        ordw: ord.wid,
                        repeati,
                        linei,
                        wordi,
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
                key={ordBlocki}
                className="mt-5"
                {...props}
              >
                {ord.isAnyInherited || !!linei || !!repeati || <div>{ord.me.header()}</div>}
                {renderBreakButton(1, !ordBlocki)}

                {words.map((word, initWordi) => {
                  if (!initWordi)
                    return (
                      <Button
                        key={initWordi}
                        size="sx"
                        className={`${isHasSelfChanges ? 'text-x8! underline' : 'text-x7!'} bg-x2! has-[>svg]:px-0! px-0!`}
                        {...(isHasSelfChanges
                          ? {
                              icon: 'Delete01',
                              onClick: () =>
                                cmEditComClientTsjrpcMethods.removeNL({
                                  comw: ccom.wid,
                                  ordw: ord.wid,
                                  linei,
                                  repeati,
                                }),
                            }
                          : { icon: 'Play' })}
                      >
                        <span dangerouslySetInnerHTML={{ __html: word }} />
                      </Button>
                    );

                  const wordi = initWordi + 1;
                  const isHasAbsWordi = currentSet.has(wordi) || currentSet.has(-wordi);
                  cloneSet.delete(wordi);
                  cloneSet.delete(-wordi);

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
                        className={`has-[>svg]:px-0! px-0! ${isHasAbsWordi ? `${isDifferentDigitsWithNear ? 'bg-x7! text-x1!' : 'bg-xKO! text-x6!'}${isHasSelfChanges ? '' : ' opacity-50!'}` : ''}`}
                        onClick={() =>
                          cmEditComClientTsjrpcMethods.switchNLWord({
                            comw: ccom.wid,
                            linei,
                            repeati,
                            wordi,
                            ordw: ord.wid,
                          })
                        }
                      >
                        <span dangerouslySetInnerHTML={{ __html: word }} />
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
                      cmEditComClientTsjrpcMethods.switchNLWord({
                        comw: ccom.wid,
                        ordw: ord.wid,
                        linei,
                        repeati,
                        wordi,
                      })
                    }
                  >
                    {wordi}
                  </Button>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
