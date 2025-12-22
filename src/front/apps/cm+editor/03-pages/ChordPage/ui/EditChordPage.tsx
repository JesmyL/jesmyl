import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components/ui/button';
import { propagationStopper } from '#shared/lib/event-funcs';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { CmEditorChordRedactableTrack } from '$cm+editor/entities/chord';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmChordCard, cmIDB } from '$cm/ext';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtom } from 'atomaric';
import { useEffect, useState } from 'react';
import { ChordPack, ChordTrack } from 'shared/api';
import { correctChordRegs } from 'shared/utils/cm/com/const';
import { cmEditorChordRedactableChordsAtom } from '../state/atoms';
import { StyledCmEditorChordPageContainer } from '../style/Page';
import { CmEditorChordChordNodes } from './ChordNodes';
import { CmEditorChordSearchUnknownChordsModalTrigger } from './SearchUnknownChordsModalTrigger';

const chordsToSendAtom = atom<ChordPack>({});

export const CmEditorChordPage = () => {
  const { newChordName = '' } = useSearch({ from: '/cm/edit/chord' });
  const navigate = useNavigate();
  const checkAccess = useCheckUserAccessRightsInScope();

  const chords = cmIDB.useValue.chordPack();
  const [currentChordName, setCurrentChord] = useState(newChordName);
  const [isNewChord, setIsNewChord] = useState(!!newChordName);
  const [redactableChords, updateRedactableChords] = useAtom(cmEditorChordRedactableChordsAtom);
  const [chordsToSend, setChordsToSend] = useAtom(chordsToSendAtom);

  const redactableChord: ChordTrack = redactableChords[currentChordName];
  const isExists = chords[currentChordName];
  const [newNameError, setNewNameError] = useState('');

  const setExecution = (pack = redactableChords) => {
    const value: ChordPack = {};
    MyLib.entries(pack).forEach(([chordName, track]) => {
      const realTrack = [...track];
      while (realTrack.at(-1) === 0) realTrack.pop();
      if (!mylib.isEq(chords[chordName], realTrack)) value[chordName] = realTrack as ChordTrack;
    });
    setChordsToSend(value);
  };

  useEffect(() => {
    if (newChordName && newChordName !== currentChordName) {
      setCurrentChord(newChordName);
      setIsNewChord(true);
    }

    setNewNameError(
      isNewChord
        ? correctChordRegs.regExp.exec(newChordName)
          ? chords[newChordName] || redactableChords[newChordName]
            ? 'Такой аккорд существует'
            : ''
          : 'Не правильное написание аккорда'
        : '',
    );
  }, [newChordName, redactableChords, chords, isNewChord, currentChordName]);

  const modifyTrack = (map: (track: ChordTrack) => ChordTrack | void) => {
    let track: ChordTrack = mylib.clone(redactableChord);
    const newTrack = map(track);

    if (mylib.isArr(newTrack)) track = newTrack;

    const newRedactableChords = {
      ...redactableChords,
      [currentChordName]: JSON.parse(JSON.stringify(track)).map((point: number) => point || 0),
    } as ChordPack;

    updateRedactableChords(newRedactableChords);

    setExecution(newRedactableChords);
  };

  return (
    <StyledCmEditorChordPageContainer
      className="chord-redactor"
      contentClass={`chord-redactor-content p-2 ${isNewChord ? 'chord-addition' : ''}`}
      headTitle="Редактор аккордов"
      head={
        (checkAccess('cm', 'CHORD', 'U') || checkAccess('cm', 'CHORD', 'C')) && (
          <div className="flex gap-2">
            <CmEditorChordSearchUnknownChordsModalTrigger />

            <TheIconButton
              icon="Sent"
              disabled={!mylib.keys(chordsToSend).length}
              disabledReason="Изменений нет"
              className="m-2"
              confirm={`Отправить аккорды ${mylib.keys(chordsToSend).join('; ')} ?`}
              onClick={async () => {
                await cmEditorClientTsjrpcMethods.setChords({ chords: chordsToSend });
                setChordsToSend({});
                updateRedactableChords({});
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
                  Вернуться к редактированию
                </Button>
              </>
            ) : currentChordName ? (
              <>
                <h2 className="text-center">{currentChordName}</h2>
                <CmChordCard chordName={currentChordName} />
              </>
            ) : (
              <div>Выбери аккорд для редактирования</div>
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
                        updateRedactableChords(newRedacts);
                      } else if (redactableChord) {
                        setIsNewChord(false);
                        setNewNameError('');
                        if (!isExists) setCurrentChord('');
                        navigate({ to: '.', search: { newChordName: '' } });
                        delete newRedacts[currentChordName];
                        updateRedactableChords(newRedacts);
                      } else if (chords) {
                        newRedacts[currentChordName] = chords[currentChordName];
                        updateRedactableChords(newRedacts);
                      }
                      setExecution(newRedacts);
                    }}
                  >
                    {isNewChord
                      ? 'Создать'
                      : redactableChord
                        ? isExists
                          ? 'Вернуть аккорд'
                          : 'Удалить аккорд'
                        : 'Редактировать'}
                  </TheButton>
                </>
              ) : (
                <div>Выбери аккорд для редактирования</div>
              )}
            </div>
          )}
        </>
      }
    />
  );
};
