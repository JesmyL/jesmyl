import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { makeToastKOMoodConfig } from '#shared/ui/modal/toast.configs';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { WithState } from '#shared/ui/WithState';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { comPlayerAudioElement } from '$cm/basis/lib/control/current-play-com';
import { useCmComOrdwToPlayButtonNodeDict } from '$cm/basis/lib/hooks/useCmComOrdwToPlayButtonNodeDict';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { useComCommentBlockCss } from '$cm/col/com/complect/comment-parser/useComCommentBlock';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { ComPlayerMarksMovers } from '$cm/col/com/player/ComPlayerMarksMovers';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { toast } from 'sonner';
import styled, { RuleSet } from 'styled-components';
import { cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom } from '../state/atoms';
import { CmComPlayerMarksConfigurerTimeMark } from './ComPlayerMarksConfigurerTimeMark';
import { CmComEditorAudioMarksRedactorOpenTimeConfiguratorModalInner } from './TimeConfiguratorModalInner';

const srcOnEditAtom = atom<null | HttpLink>(null, 'cm+editor:srcOnMarkEdit');
const preSwitchTimeAtom = atom(-1, 'cm+editor:comAudioPreSwitchTime');

export const CmEditorTabComAudioMarks = ({ ccom }: { ccom: EditableCom }) => {
  const editSrc = useAtomValue(srcOnEditAtom);
  const trackMarks = cmIDB.useAudioTrackMarks(editSrc);
  const marksOnUpdating = useAtomValue(cmComEditorAudioMarksEditPacksAtom);
  const ordwToPlayButtonNodeDict = useCmComOrdwToPlayButtonNodeDict(ccom, (playNode, time) => (
    <div
      key={time}
      className="flex flex-col gap-2"
    >
      {playNode}
      <Button
        icon="Settings01"
        onClick={() => cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom.set(time)}
      />
    </div>
  ));
  const { commentCss } = useComCommentBlockCss(ccom, true);

  useEffect(() => {
    if (!ccom.audio.length) {
      srcOnEditAtom.reset();
      return;
    }

    if (editSrc == null) {
      srcOnEditAtom.set(ccom.audio[0]);
      return;
    }

    if (!ccom.audio.includes(editSrc)) {
      srcOnEditAtom.set(ccom.audio[0]);
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
              onClick={() => srcOnEditAtom.set(src)}
            >
              {i + 1}
            </Button>
          ))}
      </ButtonGroup.Root>

      <WithState<RKey<number> | null> init={null}>
        {(pinTime, setPinTime) => (
          <ConditionalRender
            value={editSrc}
            render={editSrc => {
              return (
                <>
                  <ComPlayer
                    className="mb-20 sticky top-8! bg-x1 pb-5"
                    audioLinks={[editSrc]}
                    addRender={src => (
                      <div className="relative flex gap-5 w-full -top-8!">
                        <Button
                          icon="PlusSign"
                          onClick={() => {
                            if (editSrc == null || comPlayerAudioElement.currentTime < 0.001) {
                              toast('Песня не воспроизводилась', makeToastKOMoodConfig());
                              return;
                            }

                            const fixedTime = +comPlayerAudioElement.currentTime.toFixed(3);
                            cmComEditorAudioMarksEditPacksAtom.do.putMarks(editSrc, { [fixedTime]: `+${fixedTime}+` });
                          }}
                        />
                        <ComPlayerMarksMovers
                          src={src}
                          com={ccom}
                          repeatButtonClassName="max-w-[calc(100vw-228px)]"
                          preSwitchTimeAtom={preSwitchTimeAtom}
                        />
                      </div>
                    )}
                  />

                  {MyLib.entries(marksOnUpdating[editSrc] ?? {}).map(([time, selector]) => {
                    return (
                      !selector || (
                        <div
                          key={time}
                          className="flex gap-3"
                        >
                          <span>
                            {time} ({mylib.convertSecondsInStrTime(+time)})
                          </span>
                          <TheIconLoading />
                          <Button
                            icon="Cancel01"
                            onClick={() => cmComEditorAudioMarksEditPacksAtom.do.removeMark(editSrc, time)}
                          />
                        </div>
                      )
                    );
                  })}

                  {MyLib.entries({ ...(trackMarks?.marks ?? {}) }).map(([time, selector]) => {
                    return (
                      <CmComPlayerMarksConfigurerTimeMark
                        key={time}
                        selector={selector}
                        time={+time}
                        src={editSrc}
                        com={ccom}
                        isRemoving={marksOnUpdating[editSrc]?.[time] === null}
                        pinTime={pinTime}
                        onPin={setPinTime}
                      />
                    );
                  })}

                  <StyledComOrders
                    $commentStyles={commentCss}
                    chordVisibleVariant={ChordVisibleVariant.Maximal}
                    fontSize={20}
                    com={ccom}
                    asHeaderComponent={({ headerNode, ord }) =>
                      ord.isVisibleWithHeader() && (
                        <div className="flex flex-wrap gap-3">
                          {pinTime == null ? (
                            <Button
                              icon="PlusSign"
                              onClick={() => {
                                if (editSrc == null || comPlayerAudioElement.currentTime < 0.001) {
                                  toast('Песня не воспроизводилась', makeToastKOMoodConfig());
                                  return;
                                }

                                const fixedTime = +comPlayerAudioElement.currentTime.toFixed(3);
                                cmComEditorAudioMarksEditPacksAtom.do.putMarks(editSrc, {
                                  [fixedTime]: [ord.makeSelector()] as CmComAudioMarkSelector,
                                });
                              }}
                            />
                          ) : (
                            <Button
                              icon="PinLocation01"
                              onClick={() =>
                                cmEditComExternalsClientTsjrpcMethods
                                  .updateAudioMarks({
                                    src: editSrc,
                                    marks: { [pinTime]: [ord.makeSelector()] as CmComAudioMarkSelector },
                                  })
                                  .then(() => setPinTime(null))
                              }
                            />
                          )}
                          {headerNode}
                          {ordwToPlayButtonNodeDict?.[ord.wid]}
                        </div>
                      )
                    }
                  />

                  <Modal openAtom={cmComEditorAudioMarksRedactorOpenTimeConfiguratorAtom}>
                    {time => (
                      <CmComEditorAudioMarksRedactorOpenTimeConfiguratorModalInner
                        time={time}
                        com={ccom}
                        src={editSrc}
                      />
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

const StyledComOrders = styled(ComOrders)<{ $commentStyles?: RuleSet<object> | string }>`
  ${props => props.$commentStyles}
`;
