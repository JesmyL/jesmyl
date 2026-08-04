import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { propagationStopper } from '#shared/lib/event-funcs';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { CmEditorChordRedactableTrack } from '$cm+editor/entities/chord';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmChordCard, cmIDB } from '$cm/ext';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Atom, atom, useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { ChordPack, ChordTrack } from 'shared/api';
import { checkIsArray } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { correctChordRegsLazy } from 'shared/utils/cm/com/const';
import { forEachObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { cmEditorChordRedactableChordsAtom } from '../state/atoms';
import { StyledCmEditorChordPageContainer } from '../style/Page';
import { CmEditorChordChordNodes } from './ChordNodes';
import { CmEditorChordSearchUnknownChordsModalTrigger } from './SearchUnknownChordsModalTrigger';

let chordsToSendAtom: Atom<ChordPack>;

export const CmEditorChordPage = () => {
  chordsToSendAtom ??= atom<ChordPack>({});

  const { newChordName = '' } = useSearch({ from: '/cm/edit/chord' });
  const navigate = useNavigate();
  const checkAccess = useCheckUserAccessRightsInScope();

  const chords = cmIDB.useValue.chordPack();
  const [currentChordName, setCurrentChord] = useState(newChordName);
  const [isNewChord, setIsNewChord] = useState(!!newChordName);
  const redactableChords = useAtomValue(cmEditorChordRedactableChordsAtom);
  const chordsToSend = useAtomValue(chordsToSendAtom);

  const redactableChord: ChordTrack = redactableChords[currentChordName];
  const isExists = chords[currentChordName];
  const [newNameError, setNewNameError] = useState('');

  const setExecution = (pack = redactableChords) => {
    const value: ChordPack = {};
    forEachObjectEntries(pack, (chordName, track) => {
      const realTrack = [...track];
      while (realTrack.at(-1) === 0) realTrack.pop();
      if (!checkIsEq(chords[chordName], realTrack)) value[chordName] = realTrack as ChordTrack;
    });
    chordsToSendAtom.set(value);
  };

  useEffect(() => {
    if (newChordName && newChordName !== currentChordName) {
      setCurrentChord(newChordName);
      setIsNewChord(true);
    }

    setNewNameError(
      isNewChord
        ? correctChordRegsLazy().regExp.exec(newChordName)
          ? chords[newChordName] || redactableChords[newChordName]
            ? translateBase(it => it.cm.chExists)
            : ''
          : translateBase(it => it.cm.incCh)
        : '',
    );
  }, [newChordName, redactableChords, chords, isNewChord, currentChordName]);

  const modifyTrack = (map: (track: ChordTrack) => ChordTrack | void) => {
    let track: ChordTrack = deepClone(redactableChord);
    const newTrack = map(track);

    if (checkIsArray(newTrack)) track = newTrack;

    const newRedactableChords = {
      ...redactableChords,
      [currentChordName]: deepClone(track).map(point => point || 0),
    } as ChordPack;

    cmEditorChordRedactableChordsAtom.set(newRedactableChords);

    setExecution(newRedactableChords);
  };

  return (
    <StyledCmEditorChordPageContainer
      className="chord-redactor"
      contentClass={`chord-redactor-content p-2 ${isNewChord ? 'chord-addition' : ''}`}
      headTitle={translateBase(it => it.cm.chs)}
      head={
        (checkAccess('cm', 'CHORD', 'U') || checkAccess('cm', 'CHORD', 'C')) && (
          <div className="flex gap-2">
            <CmEditorChordSearchUnknownChordsModalTrigger />

            <TheIconButton
              icon="Sent"
              disabled={!objectLength(chordsToSend)}
              disabledReason={translateBase(it => it.noChanges)}
              className="m-2"
              confirm={translateBase(it => it.toSendSmth, { s: objectKeys(chordsToSend).join('; ') })}
              onClick={async () => {
                await cmEditorClientTsjrpcMethods.setChords({ chords: chordsToSend });
                chordsToSendAtom.set({});
                cmEditorChordRedactableChordsAtom.set({});
              }}
            />
          </div>
        )
      }
      content={
        <>
          <div
            className="chord-list"
            onTouchStart={propagationStopper}
            onTouchMove={propagationStopper}
          >
            <CmEditorChordChordNodes
              chords={chords}
              currentChordName={currentChordName}
              setCurrentChord={setCurrentChord}
            />

            {checkAccess('cm', 'CHORD', 'C') && (
              <div className="add-chord-button flex center">
                <LazyIcon
                  icon="PlusSignCircle"
                  onClick={() => setIsNewChord(true)}
                />
              </div>
            )}
          </div>
          <div className="flex column center old-chord">
            {isNewChord ? (
              <>
                <TextInput
                  onInput={newChordName => navigate({ to: '.', search: { newChordName } })}
                  value={newChordName}
                />
                {newNameError && <div className="text-xKO m-2">{newNameError}</div>}
                <Button
                  className="m-10 pointer"
                  onClick={() => {
                    setIsNewChord(false);
                    navigate({ to: '.', search: { newChordName: undefined } });
                  }}
                >
                  {translateBase(it => it.backToEdit)}
                </Button>
              </>
            ) : currentChordName ? (
              <>
                <h2 className="text-center">{currentChordName}</h2>
                <CmChordCard chordName={currentChordName} />
              </>
            ) : (
              <div>{translateBase(it => it.cm.selChEdit)}</div>
            )}
          </div>
          {checkAccess('cm', 'CHORD', 'U') && (
            <div className="flex gap-2 column center new-chord">
              {currentChordName || isNewChord ? (
                <>
                  {redactableChord && !isNewChord && (
                    <CmEditorChordRedactableTrack
                      modifyTrack={modifyTrack}
                      redactableChord={redactableChord}
                    />
                  )}
                  <TheButton
                    className="m-5"
                    confirm={!!redactableChord}
                    disabled={!!newNameError}
                    onClick={() => {
                      const newRedacts = { ...redactableChords };

                      if (isNewChord) {
                        setIsNewChord(false);
                        setNewNameError('');
                        setCurrentChord(newChordName);
                        newRedacts[newChordName] = [0];
                        cmEditorChordRedactableChordsAtom.set(newRedacts);
                      } else if (redactableChord) {
                        setIsNewChord(false);
                        setNewNameError('');
                        if (!isExists) setCurrentChord('');
                        navigate({ to: '.', search: { newChordName: '' } });
                        delete newRedacts[currentChordName];
                        cmEditorChordRedactableChordsAtom.set(newRedacts);
                      } else if (chords) {
                        newRedacts[currentChordName] = chords[currentChordName];
                        cmEditorChordRedactableChordsAtom.set(newRedacts);
                      }
                      setExecution(newRedacts);
                    }}
                  >
                    {isNewChord
                      ? translateBase(it => it.cre)
                      : redactableChord
                        ? isExists
                          ? translateBase(it => it.cm.comeBackCh)
                          : translateBase(it => it.cm.delCh)
                        : translateBase(it => it.redact)}
                  </TheButton>
                </>
              ) : (
                <div>{translateBase(it => it.cm.selChEdit)}</div>
              )}
            </div>
          )}
        </>
      }
    />
  );
};
