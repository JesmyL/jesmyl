import { propagationStopper } from '#shared/lib/event-funcs';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { ChordRedactableTrack } from '$cm+editor/entities/ChordRedactableTrack';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { ChordCard } from '$cm/col/com/chord-card/ChordCard';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtom } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { ChordPack, ChordTrack } from 'shared/api';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import styled from 'styled-components';

const redactableChordsAtom = atom<ChordPack>({});
const chordsToSendAtom = atom<ChordPack>({});

export const EditChordPage = () => {
  const { newChordName = '' } = useSearch({ from: '/cm/edit/chord' });
  const navigate = useNavigate();
  const checkAccess = useCheckUserAccessRightsInScope();

  const chords = cmIDB.useValue.chordPack();
  const [currentChordName, setCurrentChord] = useState(newChordName);
  const [isNewChord, setIsNewChord] = useState(!!newChordName);
  const [redactableChords, updateRedactableChords] = useAtom(redactableChordsAtom);
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
    setNewNameError(
      isNewChord
        ? CmComUtils.correctChordRegs.regExp.exec(newChordName)
          ? chords[newChordName] || redactableChords[newChordName]
            ? 'Такой аккорд существует'
            : ''
          : 'Не правильное написание аккорда'
        : '',
    );
  }, [newChordName, redactableChords, chords, isNewChord]);

  const chordNodes = useMemo(() => {
    const chordBoxes: Record<string, string[]> = {};
    let box: [string, number][] = [];
    const sorted = MyLib.entries({ ...redactableChords, ...chords }).sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
    const pushBox = () => {
      const names = box.map(([name, lad]) => [name, Math.trunc(lad)] as [string, number]).map(([name]) => name);
      chordBoxes[names[0]?.[0]] = names;
    };

    sorted.forEach(([chordName, [lad]]) => {
      if (!mylib.isStr(chordName)) return;
      const chordBase = box[0]?.[0]?.[0];
      if (chordBase === undefined || chordName.startsWith(chordBase)) {
        box.push([chordName, lad as number]);
      } else {
        pushBox();
        box = [[chordName, lad as number]];
      }
    });
    pushBox();

    return MyLib.entries(chordBoxes).map(([chordBase, names]) => {
      return (
        <div key={chordBase}>
          <div className={`sticky chord-base-title ${currentChordName[0] === chordBase ? 'font-bold' : ''}`}>
            {chordBase}
          </div>
          {names.map(chordName => {
            return (
              <div
                key={chordName}
                onClick={() => setCurrentChord(chordName)}
                className={
                  'flex center m-2 pointer' +
                  (currentChordName === chordName ? ' underline' : '') +
                  (redactableChords[chordName] ? ' text-x3' : '')
                }
              >
                {chordName}
              </div>
            );
          })}
        </div>
      );
    });
  }, [chords, currentChordName, redactableChords, setCurrentChord]);

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
    <StyledPageCmEditorContainer
      className="chord-redactor"
      contentClass={`chord-redactor-content p-2 ${isNewChord ? 'chord-addition' : ''}`}
      headTitle="Редактор аккордов"
      head={
        (checkAccess('cm', 'CHORD', 'U') || checkAccess('cm', 'CHORD', 'C')) && (
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
        )
      }
      content={
        <>
          <div
            className="chord-list"
            onTouchStart={propagationStopper}
            onTouchMove={propagationStopper}
          >
            <div className="chords-scroll">{chordNodes}</div>
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
                <div
                  className="p-10 pointer"
                  onClick={() => setIsNewChord(false)}
                >
                  Вернуться к редактированию
                </div>
              </>
            ) : currentChordName ? (
              <>
                <h2 className="text-center">{currentChordName}</h2>
                <ChordCard chordName={currentChordName} />
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
                    <ChordRedactableTrack
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

const StyledPageCmEditorContainer = styled(PageCmEditorContainer)`
  .content {
    --simple-border: solid 1px var(--color--3);

    display: grid;
    width: 100%;

    @media screen and (max-width: 700px) {
      grid-template-rows: 5fr 3em 5fr;
      grid-template-areas: 'old' 'list' 'new';

      .chord-list {
        border-bottom: var(--simple-border);
        padding-right: 26px;
        overflow: hidden;

        .chords-scroll {
          display: flex;
          overflow-x: scroll;

          > * {
            display: flex;
          }
        }

        .add-chord-button {
          height: 100%;
        }

        .chord-base-title {
          left: 0;
          width: 1.2em;
          text-align: center;
        }
      }
    }

    @media screen and (min-width: 700px) {
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 2fr 7fr;
      grid-template-areas: 'list old' 'list new';

      .chord-list {
        border-right: var(--simple-border);
        padding-bottom: 26px;

        .chords-scroll {
          overflow-y: scroll;
        }

        .add-chord-button {
          width: 100%;
        }
      }
    }

    &.chord-addition {
      .chord-list {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    .chord-board {
      .chord-point {
        &:not(.shadow) {
          pointer-events: none;
        }

        &.shadow {
          stroke: grey;
        }

        &.problem {
          stroke-width: 18px;
          stroke: var(--color--ko);
        }
      }
    }

    .chord-base-title {
      background: var(--color--2);
    }

    .chord-bare-adder {
      fill: var(--color--1);
      stroke: var(--color--1);

      &.fill {
        fill: var(--color--7);
        stroke: var(--color--7);
      }
    }

    .mute-string-indicator {
      font-size: 15px;

      &:not(.button) {
        pointer-events: none;
      }

      &.button {
        stroke: var(--color--ko);
        opacity: 0.7;
      }
    }

    .chord-list {
      position: relative;
      grid-area: list;

      .chords-scroll {
        width: 100%;
        height: 100%;
      }

      .add-chord-button {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }

    .old-chord {
      grid-area: old;
      border-bottom: var(--simple-border);
    }

    .new-chord {
      grid-area: new;
    }
  }
`;
