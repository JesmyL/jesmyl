import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { makeToastKOMoodConfig, Modal } from '#shared/ui/modal';
import { WithState } from '#shared/ui/WithState';
import { cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom } from '$cm+editor/entities/com-audio';
import { CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner } from '$cm+editor/features/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import {
  CmBroadcastSlidesContext,
  CmComAudioPlayer,
  CmComAudioPlayerMarksMovers,
  CmComOrderAudioMarkControlButtonsContext,
  takeCmComAudioPlayerCurrentTime,
  useCmComMarkTextValuesMaker,
  useCmComOrderAudioMarkControlButtonsContext,
} from '$cm/ext';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComAudioMarkEditPackValue, CmComAudioMarkPackTime, HttpNumLeadLink } from 'shared/api';
import { iife } from 'shared/utils';
import { checkIsNil } from 'shared/utils/checkIs';
import { makeCmBroadcastMonolineSlideOrdLineId } from 'shared/utils/cm/com/makeCmBroadcastMonolineSlideOrdId';
import { lazyInit } from 'shared/utils/lazyInit';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { CmEditorTabComAudioMarksShowSlideListButton } from './ShowSlideListButton';

const srcOnEditAtom = lazyInit(() => atom<null | HttpNumLeadLink>(null, 'cm+editor:srcOnMarkEdit'));
const preSwitchTimeAtom = lazyInit(() => atom(-1, 'cm+editor:comAudioPreSwitchTime'));

export const CmEditorTabComAudioMarks = iife(() => {
  const Child = ({ ccom }: { ccom: EditableCom }) => {
    const editSrc = useAtomValue(srcOnEditAtom());
    const { slideIdTimeDict } = useCmComMarkTextValuesMaker(ccom, editSrc);

    const { controls: audioMarkButtons, slides: { slides } = {} } = useCmComOrderAudioMarkControlButtonsContext() ?? {};

    const addTime = (value: CmComAudioMarkEditPackValue) => {
      if (!editSrc || takeCmComAudioPlayerCurrentTime() < 0.001) {
        toast('Песня не воспроизводилась', makeToastKOMoodConfig());
        return;
      }

      let fixedTime = +takeCmComAudioPlayerCurrentTime().toFixed(2);
      if (Math.trunc(fixedTime) === fixedTime) fixedTime += 0.11;

      cmComEditorAudioMarksEditPacksAtom.do.putMarks(ccom.wid, editSrc, {
        [fixedTime]: value,
      });
    };

    useEffect(() => {
      if (!ccom.audio.length) {
        srcOnEditAtom().reset();
        return;
      }

      if (editSrc == null) {
        srcOnEditAtom().set(ccom.audio[0]);
        return;
      }

      if (!ccom.audio.includes(editSrc)) {
        srcOnEditAtom().set(ccom.audio[0]);
        return;
      }
    }, [ccom.audio, editSrc]);

    return (
      <div className="mt-10">
        <ButtonGroup.Root className="mb-10">
          {ccom.audio.length > 1 &&
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

        <WithState<CmComAudioMarkPackTime | null> init={null}>
          {(pinTime, setPinTime) => (
            <ConditionalRender
              value={editSrc}
              render={editSrc => {
                return (
                  <>
                    <CmComAudioPlayer
                      className="mb-20 sticky top-8! bg-x1 pb-5"
                      audioLinks={[editSrc]}
                      addRender={src => (
                        <div className="flex gap-5 w-full">
                          <Button
                            icon="PlusSign"
                            onClick={() => addTime(mylib.convertSecondsInStrTime(takeCmComAudioPlayerCurrentTime()))}
                          />
                          <CmComAudioPlayerMarksMovers
                            src={src}
                            com={ccom}
                            repeatButtonClassName="max-w-[calc(100vw-228px)]"
                            preSwitchTimeAtom={preSwitchTimeAtom()}
                          />
                        </div>
                      )}
                    />

                    {audioMarkButtons?.afterIdDict.before}

                    {slides?.map(({ lines, id, ord, linei, repeati, samei }) => {
                      const selector = makeCmBroadcastMonolineSlideOrdLineId(ord.wid, linei, repeati, samei);

                      return (
                        <div
                          key={id}
                          className="mt-10"
                        >
                          {checkIsNil(pinTime) ? (
                            <>
                              <Button
                                icon="PlusSign"
                                onClick={() => addTime(selector)}
                                className="bg-x2!"
                              />
                              <div className="flex flex-wrap my-3">{audioMarkButtons?.idDict[id]}</div>
                            </>
                          ) : (
                            <Button
                              icon="PinLocation01"
                              disabled={pinTime === slideIdTimeDict[id]}
                              onClick={() =>
                                cmEditComExternalsClientTsjrpcMethods
                                  .updateAudioMarks_v2({
                                    comw: ccom.wid,
                                    src: editSrc,
                                    time: pinTime,
                                    sel: selector,
                                  })
                                  .then(() => setPinTime(null))
                              }
                            />
                          )}
                          <div className={twMerge(ord.isChBlock() && 'text-x7')}>
                            {lines.map((line, linei) => (
                              <div key={linei}>{line}</div>
                            ))}
                          </div>

                          {audioMarkButtons?.afterIdDict[id]}
                        </div>
                      );
                    })}

                    <Modal openAtom={cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom}>
                      {time => (
                        <CmBroadcastSlidesContext
                          com={ccom}
                          textCase={null}
                        >
                          <CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner
                            time={time}
                            com={ccom}
                            src={editSrc}
                            setPinTime={setPinTime}
                          />
                        </CmBroadcastSlidesContext>
                      )}
                    </Modal>
                  </>
                );
              }}
            />
          )}
        </WithState>
      </div>
    );
  };

  return ({ ccom }: { ccom: EditableCom }) => {
    return (
      <CmComOrderAudioMarkControlButtonsContext
        com={ccom}
        isNeedCompute
        preTimeAtom={preSwitchTimeAtom()}
        mapNode={(playNode, time) =>
          time === 0 ? (
            <div
              key={time}
              className="my-3"
            >
              {playNode}
            </div>
          ) : (
            <div
              key={time}
              className="flex flex-col gap-2"
            >
              {playNode}
              <Button
                icon="Settings01"
                onClick={() => cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom.set(time)}
              />
            </div>
          )
        }
      >
        <Child ccom={ccom} />
      </CmComOrderAudioMarkControlButtonsContext>
    );
  };
});
