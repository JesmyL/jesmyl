import { propagationStopper } from 'front/complect/utils/utils';
import { MyLib, mylib } from 'front/utils';
import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from '../../../../../complect/atoms';
import TheButton from '../../../../../complect/Button';
import { useExerExec } from '../../../../../complect/exer/hooks/useExer';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import { IconPlusSignCircleStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign-circle';
import { cmExer } from '../../CmExer';
import { useToNewChordSearches } from '../../col/com/chord-card/chord-redactor-searches';
import ChordCard from '../../col/com/chord-card/ChordCard';
import { ChordPack, ChordTrack } from '../../col/com/chord-card/ChordCard.model';
import { cmMolecule } from '../../molecules';
import { correctChordNameReg } from '../Editor.complect';
import PhaseCmEditorContainer from '../phase-editor-container/PhaseCmEditorContainer';
import ChordRedactableTrack from './ChordRedactableTrack';
import './ChordRedactor.scss';

const chordTracksAtom = cmMolecule.select(s => s.chordTracks);

export default function ChordRedactor() {
  const [{ newChordName = '' }, setProps] = useToNewChordSearches();

  const chords = useAtomValue(chordTracksAtom);
  const [currentChordName, setCurrentChord] = useState(newChordName);
  const [isNewChord, setIsNewChord] = useState(!!newChordName);
  const [redactableChords, updateRedactableChords] = useState<ChordPack>({});

  const redactableChord: ChordTrack = redactableChords[currentChordName];
  const isExists = chords[currentChordName];
  const [newNameError, setNewNameError] = useState('');
  const exec = useExerExec();

  const setExecution = (pack = redactableChords) => {
    const value: ChordPack = {};
    MyLib.entries(pack).forEach(([chordName, track]) => {
      const realTrack = [...track];
      while (realTrack.at(-1) === 0) realTrack.pop();
      if (!mylib.isEq(chords[chordName], realTrack)) value[chordName] = realTrack as ChordTrack;
    });
    cmExer.set({
      action: 'updateChordTracksDict',
      method: 'set',
      value,
      prev: {},
      args: {
        value,
        chordNames: MyLib.keys(value).join(', '),
      },
      onLoad: () => setProps({ newChordName: '' }),
    });
    exec();
  };

  useEffect(() => {
    setNewNameError(
      isNewChord
        ? correctChordNameReg.exec(newChordName)
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
          <div className={`sticky chord-base-title ${currentChordName[0] === chordBase ? 'text-bold' : ''}`}>
            {chordBase}
          </div>
          {names.map(chordName => {
            return (
              <div
                key={chordName}
                onClick={() => setCurrentChord(chordName)}
                className={
                  'flex center margin-gap pointer' +
                  (currentChordName === chordName ? ' text-underline' : '') +
                  (redactableChords[chordName] ? ' color--3' : '')
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
    <PhaseCmEditorContainer
      className="chord-redactor"
      contentClass={`chord-redactor-content padding-gap ${isNewChord ? 'chord-addition' : ''}`}
      headTitle="Редактор аккордов"
      content={
        <>
          <div
            className="chord-list"
            onTouchStart={propagationStopper}
            onTouchMove={propagationStopper}
          >
            <div className="chords-scroll">{chordNodes}</div>
            <div className="add-chord-button flex center">
              <IconPlusSignCircleStrokeRounded onClick={() => setIsNewChord(true)} />
            </div>
          </div>
          <div className="flex column center old-chord">
            {isNewChord ? (
              <>
                <KeyboardInput
                  onInput={newChordName => setProps({ newChordName })}
                  value={newChordName}
                />
                {newNameError && <div className="error-message margin-gap">{newNameError}</div>}
                <div
                  className="padding-giant-gap pointer"
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
          <div className="flex flex-gap column center new-chord">
            {currentChordName || isNewChord ? (
              <>
                {redactableChord && !isNewChord && (
                  <ChordRedactableTrack
                    modifyTrack={modifyTrack}
                    redactableChord={redactableChord}
                  />
                )}
                <TheButton
                  className="margin-big-gap"
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
                      setProps({ newChordName: '' });
                      delete newRedacts[currentChordName];
                      updateRedactableChords(newRedacts);
                    } else {
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
        </>
      }
    />
  );
}
