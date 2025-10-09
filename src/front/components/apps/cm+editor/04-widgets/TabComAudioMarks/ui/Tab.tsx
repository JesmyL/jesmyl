import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { WithState } from '#shared/ui/WithState';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { ComPlayer } from '$cm/col/com/player/ComPlayer';
import { ComPlayerMarksMovers } from '$cm/col/com/player/ComPlayerMarksMovers';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComAudioMarkSelector, HttpLink } from 'shared/api';
import { CmEditorTabWithComAudioMarks_AddMarkButton } from './AddMarkButton';
import { CmComPlayerMarksConfigurerTimeMark } from './ComPlayerMarksConfigurerTimeMark';

const srcOnEditAtom = atom<null | HttpLink>(null, 'cm+editor:srcOnMarkEdit');

export const CmEditorTabComAudioMarks = ({ ccom }: { ccom: EditableCom }) => {
  const editSrc = useAtomValue(srcOnEditAtom);
  const trackMarks = cmIDB.useAudioTrackMarks(editSrc);
  const marksOnUpdating = useAtomValue(cmComEditorAudioMarksEditPacksAtom);

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
              const markEntries = MyLib.entries({ ...(trackMarks?.marks ?? {}), ...(marksOnUpdating[editSrc] ?? {}) });

              return (
                <>
                  <ComPlayer
                    className="relative mb-20 sticky top-10!"
                    audioLinks={[editSrc]}
                    addRender={src => (
                      <ComPlayerMarksMovers
                        src={src}
                        com={ccom}
                      />
                    )}
                  />

                  <CmEditorTabWithComAudioMarks_AddMarkButton src={editSrc} />

                  {markEntries.map(([time, selector]) => {
                    if (selector !== `+${time}+`) return;

                    return (
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
                    );
                  })}

                  {markEntries.map(([time, selector]) => {
                    if (selector === `+${time}+`) return;

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

                  <ComOrders
                    chordVisibleVariant={ChordVisibleVariant.Maximal}
                    com={ccom}
                    asHeaderComponent={
                      pinTime == null
                        ? undefined
                        : ({ headerNode, ord }) => (
                            <>
                              {headerNode}
                              <Button
                                icon="PinLocation01"
                                className="ml-3"
                                onClick={() =>
                                  cmEditComExternalsClientTsjrpcMethods
                                    .updateAudioMarks({
                                      src: editSrc,
                                      marks: {
                                        [pinTime]: [ord.makeSelector()] as CmComAudioMarkSelector,
                                      },
                                    })
                                    .then(() => setPinTime(null))
                                }
                              />
                            </>
                          )
                    }
                  />
                </>
              );
            }}
          />
        )}
      </WithState>
    </div>
  );
};
