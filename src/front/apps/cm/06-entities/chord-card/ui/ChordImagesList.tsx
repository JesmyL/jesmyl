import { itIt } from 'shared/utils';
import { CmCom } from '../../com/lib/Com';
import { CmChordCard } from './ChordCard';
import { CmChordCardUndefined } from './UndefinedChordCard';

export const CmChordCardImageList = ({ com }: { com: CmCom }) => {
  return (
    <div className="m-5 flex center column">
      {com?.usedChords &&
        Object.keys(com.usedChords)
          .filter(itIt)
          .map(chordName => {
            return (
              <CmChordCard
                key={chordName}
                chordName={chordName}
                customContent={card => {
                  return (
                    <div
                      key={chordName}
                      className="flex column m-5"
                    >
                      {card || <CmChordCardUndefined chord={chordName} />}
                      {com.usedChords?.[chordName] || '?'}
                    </div>
                  );
                }}
              />
            );
          })}
    </div>
  );
};
