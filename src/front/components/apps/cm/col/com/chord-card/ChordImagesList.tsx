import { useCcom } from '../useCcom';
import ChordCard from './ChordCard';

export default function ChordImagesList() {
  const ccom = useCcom();
  return (
    <div className="margin-big-gap flex center column">
      {ccom?.usedChords &&
        Object.keys(ccom.usedChords)
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
                      {card || <div className="error-message">Неизвестный аккорд</div>}
                      {ccom.usedChords?.[chordName] || '?'}
                    </div>
                  );
                }}
              />
            );
          })}
    </div>
  );
}
