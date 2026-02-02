import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { makeToastKOMoodConfig, Modal } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { WithState } from '#shared/ui/WithState';
import {
  CmEditorComAudioMarksConfigurerTimeMark,
  cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom,
} from '$cm+editor/entities/com-audio';
import { CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner } from '$cm+editor/features/com-audio';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/shared/state/com';
import {
  ChordVisibleVariant,
  CmComAudioPlayer,
  cmComAudioPlayerHTMLElement,
  CmComAudioPlayerMarksMovers,
  CmComOrderLine,
  CmComOrderList,
  cmIDB,
  useCmComCommentBlockCss,
  useCmComOrderAudioMarkControlButtons,
} from '$cm/ext';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComAudioMarkPackTime, HttpLink } from 'shared/api';
import { toast } from 'sonner';
import styled, { RuleSet } from 'styled-components';
import { CmEditorTabComAudioMarksShowSlideListButton } from './ShowSlideListButton';

let srcOnEditAtom: Atom<null | HttpLink>;
let preSwitchTimeAtom: Atom<number>;

export const CmEditorTabComAudioMarks = ({ ccom }: { ccom: EditableCom }) => {
  srcOnEditAtom ??= atom<null | HttpLink>(null, 'cm+editor:srcOnMarkEdit');
  preSwitchTimeAtom ??= atom(-1, 'cm+editor:comAudioPreSwitchTime');

  const editSrc = useAtomValue(srcOnEditAtom);
  const trackMarks = cmIDB.useAudioTrackMarks(editSrc);
  const marksOnUpdating = useAtomValue(cmComEditorAudioMarksEditPacksAtom);
  const { commentCss } = useCmComCommentBlockCss(ccom, true);

  const audioMarkControl = useCmComOrderAudioMarkControlButtons(
    preSwitchTimeAtom,
    true,
    ccom,
    false,
    (playNode, time) =>
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
      ),
  );

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

      <CmEditorTabComAudioMarksShowSlideListButton
        ccom={ccom}
        src={editSrc}
      />

      <WithState<RKey<CmComAudioMarkPackTime> | null> init={null}>
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
                          onClick={() => {
                            if (editSrc == null || cmComAudioPlayerHTMLElement.currentTime < 0.001) {
                              toast('Песня не воспроизводилась', makeToastKOMoodConfig());
                              return;
                            }

                            let fixedTime: CmComAudioMarkPackTime = +cmComAudioPlayerHTMLElement.currentTime.toFixed(2);
                            if (Math.trunc(fixedTime) === fixedTime) fixedTime += 0.11;

                            cmComEditorAudioMarksEditPacksAtom.do.putMarks(ccom.wid, editSrc, {
                              [fixedTime]: `+${fixedTime}+`,
                            });
                          }}
                        />
                        <CmComAudioPlayerMarksMovers
                          src={src}
                          com={ccom}
                          repeatButtonClassName="max-w-[calc(100vw-228px)]"
                          preSwitchTimeAtom={preSwitchTimeAtom}
                        />
                      </div>
                    )}
                  />

                  {MyLib.entries(marksOnUpdating[editSrc]?.[ccom.wid] ?? {}).map(([time, selector]) => {
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
                            onClick={() => cmComEditorAudioMarksEditPacksAtom.do.removeMark(ccom.wid, editSrc, time)}
                          />
                        </div>
                      )
                    );
                  })}

                  {MyLib.entries(trackMarks?.cMarks?.[ccom.wid] ?? {}).map(([time, selector]) => {
                    return (
                      <CmEditorComAudioMarksConfigurerTimeMark
                        key={time}
                        selector={selector}
                        time={+time}
                        src={editSrc}
                        com={ccom}
                        pinTime={pinTime}
                        onPin={setPinTime}
                      />
                    );
                  })}

                  {audioMarkControl.afterTargetOrdwOtherPlayButtonNodeDict.before}

                  <StyledComOrders
                    $commentStyles={commentCss}
                    chordVisibleVariant={ChordVisibleVariant.None}
                    fontSize={20}
                    com={ccom}
                    asContentAfterOrder={({ ord }) =>
                      audioMarkControl.afterTargetOrdwOtherPlayButtonNodeDict[ord.makeSelector()]
                    }
                    asLineComponent={props => (
                      <div className="flex gap-2 custom-align-items">
                        <span className="text-x7">{props.solidTextLinei + 1}</span>
                        <CmComOrderLine {...props} />
                      </div>
                    )}
                    asHeaderComponent={({ headerNode, ord }) =>
                      ord.isVisibleOrd() && (
                        <div className="flex flex-wrap gap-3">
                          {pinTime == null ? (
                            <Button
                              icon="PlusSign"
                              onClick={() => {
                                if (editSrc == null || cmComAudioPlayerHTMLElement.currentTime < 0.001) {
                                  toast('Песня не воспроизводилась', makeToastKOMoodConfig());
                                  return;
                                }

                                let fixedTime: CmComAudioMarkPackTime =
                                  +cmComAudioPlayerHTMLElement.currentTime.toFixed(2);
                                if (Math.trunc(fixedTime) === fixedTime) fixedTime += 0.11;

                                cmComEditorAudioMarksEditPacksAtom.do.putMarks(ccom.wid, editSrc, {
                                  [fixedTime]: [ord.makeSelector()],
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
                                    cMarks: { [ccom.wid]: { [pinTime]: [ord.makeSelector()] } },
                                  })
                                  .then(() => setPinTime(null))
                              }
                            />
                          )}
                          {headerNode}
                          {audioMarkControl.ordwPlayButtonNodeDict[ord.wid]}
                        </div>
                      )
                    }
                  />

                  <Modal openAtom={cmEditorComAudioMarksRedactorOpenTimeConfiguratorAtom}>
                    {time => (
                      <CmEditorComAudioMarksRedactorOpenTimeConfiguratorModalInner
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

const StyledComOrders = styled(CmComOrderList)<{ $commentStyles?: RuleSet<object> | string }>`
  ${props => props.$commentStyles}
`;
