import { MyLib, mylib } from '#shared/lib/my-lib';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { ChordPack } from 'shared/api';
import { cmEditorChordRedactableChordsAtom } from '../state/atoms';

export const CmEditorChordChordNodes = ({
  chords,
  currentChordName,
  setCurrentChord,
}: {
  chords: ChordPack;
  currentChordName: string;
  setCurrentChord: (chordName: string) => void;
}) => {
  const redactableChords = useAtomValue(cmEditorChordRedactableChordsAtom);

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

  return <div className="chords-scroll">{chordNodes}</div>;
};
