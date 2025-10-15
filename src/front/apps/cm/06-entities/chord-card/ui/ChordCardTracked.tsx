import React, { JSX, ReactNode } from 'react';
import { ChordTrack } from 'shared/api';
import '../style/ChordCard.scss';

const stringsCount = 6;
const leftMargin = 8;

const strings: number[] = [];
for (let i = 1; i <= stringsCount; i++) strings.push(i);

export const CmChordCardTracked = ({
  customContent,
  bottomPadding = 0,
  track,
  additions,
}: {
  track?: ChordTrack | null;
  customContent?: (card: JSX.Element | null) => JSX.Element;
  bottomPadding?: number;
  additions?: (
    lads: number[],
    strings: number[],
    stringsCount: number,
    leftMargin: number,
    betweenStr: number,
    betweenLad: number,
    track: ChordTrack,
    mutes: number[],
    baseLad: number,
  ) => ReactNode;
}) => {
  if (!track) return customContent ? customContent(null) : null;

  const [baseLadStr, mutesStr] = ('' + track[0]).split('.');
  const baseLad = +baseLadStr;
  const betweenStr = 20 + baseLad * 0.3;
  const betweenLad = 80 - baseLad * 0.7;
  const isFLad = baseLad === 0;

  const mutes = !mutesStr ? [] : (mutesStr.split('').map(Number) ?? []);

  const lads: number[] = [];
  for (let i = 1; i <= (track.length > 4 ? track.length - 1 : 3); i++) {
    const trace = track[i];
    if (trace && trace > 0 && trace < 1) continue;
    lads.push(i);
  }

  const stringLength = betweenLad * lads.length + 17;

  const card = (
    <svg
      className="chord-board"
      style={{
        width: stringLength,
        height: betweenStr * stringsCount + bottomPadding,
      }}
    >
      {isFLad ? (
        <polyline
          // zero line
          points={`2,0 2,${betweenStr * stringsCount}`}
          className="chord-zero-line"
        />
      ) : (
        <polyline
          points={`${leftMargin},0 ${leftMargin},${betweenStr * stringsCount}`}
          className="chord-lad"
        />
      )}
      {lads.map((ladPos, ladPosi) => {
        const x = leftMargin + betweenLad * ladPos;
        const ladNum = ladPosi + baseLad + 1;
        const markDotX = x - betweenLad / 2;
        const markDotY = betweenStr * stringsCount;

        return (
          <React.Fragment key={ladPos}>
            <polyline
              points={`${x},0 ${x},${betweenStr * stringsCount}`}
              className="chord-lad"
            />
            {(ladNum === 5 || ladNum === 7 || ladNum === 9 || ladNum === 15 || ladNum === 17) && (
              <polyline
                points={`${markDotX},${markDotY} ${markDotX},${markDotY}`}
                className="chord-lad-mark"
              />
            )}
            {ladNum === 12 && (
              <>
                <polyline
                  points={`${markDotX - 4},${markDotY} ${markDotX - 4},${markDotY}`}
                  className="chord-lad-mark"
                />
                <polyline
                  points={`${markDotX + 4},${markDotY} ${markDotX + 4},${markDotY}`}
                  className="chord-lad-mark"
                />
              </>
            )}
            <text
              className="chord-lad-number"
              x={x - (ladNum < 10 ? 20 : 38)}
              y={betweenStr * stringsCount - 3}
            >
              {ladNum}
            </text>
          </React.Fragment>
        );
      })}
      {additions?.(lads, strings, stringsCount, leftMargin, betweenStr, betweenLad, track, mutes, baseLad)}
      {strings.map(stringPos => {
        const y = betweenStr * stringPos - betweenStr / 2;

        return (
          <React.Fragment key={stringPos}>
            <polyline
              points={`0,${y} ${stringLength},${y}`}
              className="chord-string"
              strokeWidth={0.5 + stringPos / 5}
            />
            {mutes.includes(stringPos) && (
              <text
                className="mute-string-indicator"
                x={leftMargin - 5}
                y={y + 4}
              >
                &times;
              </text>
            )}
          </React.Fragment>
        );
      })}

      {track.map((trace, tracei) => {
        if (tracei === 0 || !trace || (trace > 0 && trace < 1)) return null;
        const x = leftMargin + (tracei * betweenLad - betweenLad / 2);
        if (trace < 0) {
          const [startStr, finishStr] = ('' + -trace).split('');
          const start = finishStr ? +startStr : 1;
          const finish = trace === -1 ? 6 : finishStr ? +finishStr : +startStr;

          return (
            <polyline
              key={tracei}
              className="chord-point"
              points={`${x},${betweenStr / 2 + betweenStr * (start - 1)} ${x},${betweenStr * finish - betweenStr / 2}`}
            />
          );
        }

        return [('' + trace).split('')].flat().map(pos => {
          const y = betweenStr * +pos - betweenStr / 2;
          return (
            <polyline
              key={pos}
              className="chord-point"
              points={`${x},${y} ${x},${y}`}
            />
          );
        });
      })}
    </svg>
  );

  return customContent ? customContent(card) : card;
};
