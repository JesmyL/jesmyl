import { CmCom } from 'shared/const/cm/Com';
import { itIt } from 'shared/utils';
import { ChordInstrument } from 'shared/utils/cm/com/chordTrack.model';
import { CmChordCard } from './ChordCard';
import { CmChordCardUndefined } from './UndefinedChordCard';

export const CmChordCardImageList = ({
  com,
  instrument = ChordInstrument.Guitar,
}: {
  com: CmCom;
  instrument?: ChordInstrument;
}) => {
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
                instrument={instrument}
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
