import { itIt } from 'shared/utils';
import { Com } from '../Com';
import { ChordCard } from './ChordCard';
import { CmUndefinedChordCard } from './UndefinedChordCard';

export function ChordImagesList({ com }: { com: Com }) {
  return (
    <div className="margin-big-gap flex center column">
      {com?.usedChords &&
        Object.keys(com.usedChords)
          .filter(itIt)
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
