import { useCom } from '$cm/basis/lib/com-selections';
import { CmComWid } from 'shared/api';
import { ChordCard } from './ChordCard';
import { CmUndefinedChordCard } from './UndefinedChordCard';

export function ChordImagesList({ comw }: { comw: CmComWid }) {
  const com = useCom(comw);

  return (
    <div className="margin-big-gap flex center column">
      {com?.usedChords &&
        Object.keys(com.usedChords)
          .filter(uc => uc)
          .map(chordName => {
            return (
              <ChordCard
                key={chordName}
                chordName={chordName}
                customContent={card => {
                  return (
                    <div
                      key={chordName}
                      className="flex column margin-big-gap"
                    >
                      {card || <CmUndefinedChordCard chord={chordName} />}
                      {com.usedChords?.[chordName] || '?'}
                    </div>
                  );
                }}
              />
            );
          })}
    </div>
  );
}
