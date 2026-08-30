import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { makeToastKOMoodConfig, Modal } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '$cm+editor/entities/com-audio';
import { CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner } from '$cm+editor/features/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import {
  CmAudioMarkControlButtonsContext,
  cmBroadcastCurrentNameSpaceiAtom,
  CmBroadcastShowNlNameSpaceSelector,
  CmComAudioPlayer,
  CmComAudioPlayerMarksMovers,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  cmComAudioPlayerUpdatePlaybackRate,
  takeCmComAudioPlayerCurrentTime,
  useCmAudioMarkControlButtonsContext,
  useCmComMarkTextValuesMaker,
} from '$cm/ext';
import styled from '@emotion/styled';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { CmComAudioMarkEditPackValue, CmComAudioMarkPackTime, CmComOrderWidNever, HttpNumLeadLink } from 'shared/api';
import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';
import { TextCase } from 'shared/model/common';
import { convertSecondsInStrTime, iife, wait } from 'shared/utils';
import { checkIsNil, checkIsNotNil, checkIsNumber, checkIsString } from 'shared/utils/checkIs';
import { makeCmComTextInnerHtmlProp } from 'shared/utils/cm/com/const';
import {
  convertCmBroadcastMonolineSlideOrdLineId,
  makeCmBroadcastMonolineSlideOrdLineId,
} from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { lazyInit } from 'shared/utils/lazyInit';
import { arrayByLength } from 'shared/utils/object.utils';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { CmEditorTabComAudioMarksShowSlideListButton } from './ShowSlideListButton';

const srcOnEditAtom = lazyInit(() => atom<null | HttpNumLeadLink>(null, 'cm+editor:srcOnMarkEdit'));
const preSwitchTimeAtom = lazyInit(() => atom(-1, 'cm+editor:comAudioPreSwitchTime'));
const pinTimeAtom = lazyInit(() => atom<CmComAudioMarkPackTime | null>(null));
const playbackRateAtom = lazyInit(() => atom(1));

export const CmEditorTabComAudioMarks = iife(() => {
  const Child = ({ ccom }: { ccom: EditableCom }) => {
    const editSrc = useAtomValue(srcOnEditAtom());
    const { slideIdTimeSetDict, markTimes } = useCmComMarkTextValuesMaker(ccom, editSrc, TextCase.AsIs);
    const pinTime = useAtomValue(pinTimeAtom());
    const playbackRate = useAtomValue(playbackRateAtom());

    useEffect(() => {
      cmComAudioPlayerUpdatePlaybackRate(playbackRate);
    }, [playbackRate]);

    useEffect(() => {
      const scroll = async () => {
        await wait(100);
        for (const timer of arrayByLength(10, () => 10)) {
          const elem = document.querySelector(`[com-audio-mark-time-selector="${pinTime}"],[data-cancel-button]`);

          if (elem) {
            elem?.scrollIntoView({ block: 'center' });
            break;
          }
          await wait(timer);
        }
      };

      scroll();

      return () => {
        scroll();
      };
    }, [pinTime]);

    const { controls: audioMarkButtons, slides } = useCmAudioMarkControlButtonsContext() ?? {};

    const addTime = (value: CmComAudioMarkEditPackValue) => {
      if (!editSrc || takeCmComAudioPlayerCurrentTime() < 0.001) {
        toast('Песня не воспроизводилась', makeToastKOMoodConfig());
        return;
      }

      let fixedTime = +takeCmComAudioPlayerCurrentTime().toFixed(2);
      if (Math.trunc(fixedTime) === fixedTime) fixedTime += 0.11;
      if (!findInctorrectTime(fixedTime)) fixedTime += 0.01;

      cmComEditorAudioMarksEditPacksAtom.do.putMarks(ccom.wid, editSrc, {
        [fixedTime]: value,
      });
    };

    useEffect(() => {
      if (!ccom.audio?.length) {
        srcOnEditAtom().reset();
        return;
      }

      if (editSrc == null || !ccom.audio.includes(editSrc)) {
        srcOnEditAtom().set(ccom.audio[0]);
        return;
      }
    }, [ccom.audio, editSrc]);

    return (
      <div className="mt-10">
        <ButtonGroup.Root className="mb-10">
          {ccom.audio &&
            ccom.audio.length > 1 &&
            ccom.audio.map((src, i) => (
              <Button
                key={i}
                variant={src === editSrc ? 'secondary' : 'link'}
                onClick={() => srcOnEditAtom().set(src)}
              >
                {i + 1}
              </Button>
            ))}
        </ButtonGroup.Root>

        <CmEditorTabComAudioMarksShowSlideListButton
          ccom={ccom}
          src={editSrc}
        />
        {editSrc && (
          <>
            <CmComAudioPlayer
              className="-mx-2 w-[100vw] mb-20 sticky top-8! bg-x1 pb-5"
              links={editSrc}
              addRender={src => (
                <div className="flex gap-5 w-full">
                  <Button
                    icon="PlusSign"
                    onClick={() => addTime(convertSecondsInStrTime(takeCmComAudioPlayerCurrentTime()))}
                  />
                  <CmComAudioPlayerMarksMovers
                    src={src}
                    com={ccom}
                    repeatButtonClassName="max-w-[calc(100vw-288px)]"
                    preSwitchTimeAtom={preSwitchTimeAtom()}
                  />
                  <Dropdown
                    id={playbackRate}
                    items={[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => ({ id: num, title: num.toFixed(1) }))}
                    onSelectId={playbackRateAtom().set}
                    hiddenArrow
                  />
                </div>
              )}
            />

            <Button
              icon="SearchFocus"
              onClick={() => {
                const time = markTimes.findLast(findInctorrectTime);
                if (!time) {
                  toast('Не нашлось некорректного времени');
                  return;
                }

                cmComAudioPlayerUpdateCurrentTime(time);
                cmComAudioPlayerSwitchIsPlay(true);
              }}
            />

            {audioMarkButtons?.afterIdDict.before}

            {slides?.slides?.map(({ text, id, ord, linei, repeati, samei, ids }) => {
              if (ord.wid === CmComOrderWidNever) return;
              const selector = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei);

              return (
                <div
                  key={id}
                  className={twMerge('mt-10', repeati && '*:underline', repeati > 1 && '*:decoration-double')}
                >
                  {checkIsNil(pinTime) ? (
                    <>
                      <Button
                        icon="PlusSign"
                        onClick={() => addTime(selector)}
                        className="bg-x2!"
                      />
                      <div className="flex flex-wrap gap-x-1 gap-y-3 my-3">{audioMarkButtons?.idDict[id]}</div>
                    </>
                  ) : slideIdTimeSetDict[id]?.has(pinTime) ? (
                    <Button
                      icon="Cancel01"
                      className="text-xKO"
                      data-cancel-button=""
                      onClick={pinTimeAtom().reset}
                    />
                  ) : (
                    <Button
                      icon="PinLocation01"
                      onClick={() =>
                        cmEditComExternalsClientTsjrpcMethods
                          .updateAudioMarks_v2({
                            comw: ccom.wid,
                            src: editSrc,
                            time: pinTime,
                            sel: selector,
                          })
                          .then(pinTimeAtom().reset)
                      }
                    />
                  )}
                  <div
                    className={twMerge('white-pre', ord.isChBlock() && 'text-x7')}
                    {...makeCmComTextInnerHtmlProp(text)}
                  />

                  {audioMarkButtons && Array.from(ids).map(id => audioMarkButtons.afterIdDict[id])}
                </div>
              );
            })}

            <Modal openAtom={cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom}>
              {time => (
                <CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner
                  time={time}
                  com={ccom}
                  src={editSrc}
                  pinTimeAtom={pinTimeAtom()}
                />
              )}
            </Modal>
          </>
        )}
      </div>
    );
  };

  return ({ ccom }: { ccom: EditableCom }) => {
    const nameSpacei = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);
    const com = useMemo(() => {
      if (nameSpacei) {
        //
      }
      return new EditableCom(ccom.top, null, null);
    }, [ccom.top, nameSpacei]);
    const nameSpaceTitleList = [translateBase(it => it.cm.bro.five), translateBase(it => it.cm.bro.duo)];

    const pinTime = useAtomValue(pinTimeAtom());
    const cache = useMemo((): CmBroadcastMonolineSlide[][] => (nameSpacei ? [] : []), [nameSpacei]);
    const [isShowOtherMarks, setIsShowOtherMarks] = useState(false);
    const key = `${nameSpacei}-${isShowOtherMarks}`;

    return (
      <CmAudioMarkControlButtonsContext
        key={key}
        com={com}
        isNeedCompute
        preTimeAtom={preSwitchTimeAtom()}
        mapNode={(playNode, time, sel, isUnknownMark) => {
          const selStrId = checkIsString(sel) ? '' : convertCmBroadcastMonolineSlideOrdLineId(sel);
          let innerNode: ReactNode = (
            <>
              {pinTime === time ? (
                <Button
                  icon="Cancel01"
                  className="text-xKO"
                  data-cancel-button=""
                  onClick={pinTimeAtom().reset}
                />
              ) : checkIsNotNil(pinTime) || !time ? (
                <Button
                  icon="PinLocation02"
                  onClick={() => pinTimeAtom().set(time)}
                />
              ) : (
                <ButtonWithMeta
                  icon="Settings01"
                  data-meta={time}
                  meta-dot-pos={`${time}`.at(-2)}
                  onClick={() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.set(time)}
                />
              )}
            </>
          );

          if (isUnknownMark) {
            const otherNlIndex =
              isUnknownMark &&
              selStrId &&
              com.top.nl?.findIndex(
                (_, nli) =>
                  nameSpacei !== nli &&
                  (cache[nli] ??= new EditableCom(ccom.top, null, null).makeExpandSlides(
                    [nli],
                    false,
                    TextCase.AsIs,
                  )).some(slide => slide.id === selStrId),
              );

            if (checkIsNumber(otherNlIndex) && otherNlIndex > -1) {
              innerNode = isShowOtherMarks && (
                <span className="text-x7">{nameSpaceTitleList[otherNlIndex] || 'Др. набор'}</span>
              );
            } else {
              innerNode = (
                <>
                  <span className="text-xKO">?????</span>
                  {innerNode}
                </>
              );
            }
          }

          return (
            innerNode && (
              <div
                key={time}
                className="flex flex-col gap-2 my-3"
              >
                {playNode}
                {innerNode}
              </div>
            )
          );
        }}
      >
        <div className="mt-10">
          <CmBroadcastShowNlNameSpaceSelector />
          <IconCheckbox
            checked={isShowOtherMarks}
            onChange={setIsShowOtherMarks}
            postfix="Показывать другие метки"
          />
        </div>

        <Child
          key={key}
          ccom={com}
        />
      </CmAudioMarkControlButtonsContext>
    );
  };
});

const ButtonWithMeta = styled(Button)<{ 'data-meta': string | number; 'meta-dot-pos': string | und }>`
  position: relative;
  margin-inline: 0.2em;

  &:not([meta-dot-pos='.']):before {
    color: red;
    font-size: 1em;
  }

  &:before {
    content: attr(data-meta);
    position: absolute;
    right: 0;
    bottom: -0.7em;
    font-size: 0.8em;
  }
`;

const findInctorrectTime = (time: number) => `${time}`.at(-2) !== '.';
