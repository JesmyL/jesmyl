import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmChordCardTracked } from '$cm/ext';
import React from 'react';
import { ChordTrack } from 'shared/api';

const ladLine = Array(20).fill(0);

export const CmEditorChordRedactableTrack = ({
  redactableChord,
  modifyTrack,
}: {
  redactableChord: ChordTrack;
  modifyTrack: (map: (track: ChordTrack) => void) => void;
}) => {
  return (
    <>
      <Dropdown
        placeholder="Начальный лад"
        className="w-[50%]"
        id={Math.trunc(redactableChord[0])}
        items={ladLine.map((_, lad) => ({ title: `Лад ${lad + 1}`, id: lad }))}
        onSelect={({ id }) => {
          modifyTrack(track => {
            track[0] = +`${id}.${('' + track[0]).split('.')[1] || ''}`;
          });
        }}
      />
      <div className="flex gap-2">
        <CmChordCardTracked
          track={redactableChord}
          bottomPadding={20}
          additions={(lads, strings, stringsCount, leftMargin, betweenStr, betweenLad, track, mutes, baseLad) => {
            const ladHeight = stringsCount * betweenStr;

            return (
              <>
                {lads.map(lad => {
                  const x1 = leftMargin + (lad * betweenLad - betweenLad / 2);
                  const y1 = ladHeight;
                  const wt = betweenLad / 5;
                  const x2 = x1 - wt / 2;
                  const y2 = y1 + wt;
                  const x3 = x1 + wt / 2;
                  const position = track[lad] || 0;
                  const isBare = position < 0;

                  return (
                    <polygon
                      key={lad}
                      className={`chord-bare-adder pointer ${isBare ? 'fill' : ''}`}
                      points={`${x1},${y1} ${x2},${y2} ${x3},${y2}`}
                      onClick={() => {
                        modifyTrack(track => {
                          if (isBare) track[lad] = position === -1 ? 0 : -position;
                          else {
                            if (position > 100) {
                              const line = ('' + position).split('').sort();
                              track[lad] = -`${line[0]}${line.at(-1)}`;
                            } else if (position) track[lad] = -position;
                            else track[lad] = -1;
                          }
                        });
                      }}
                    />
                  );
                })}
                {strings.map(strNum => {
                  const y = strNum * betweenStr - betweenStr / 2;

                  return (
                    <React.Fragment key={strNum}>
                      <text
                        className="mute-string-indicator button"
                        x={leftMargin - 5}
                        y={y + 4}
                        onClick={() => {
                          modifyTrack(track => {
                            if (mutes.includes(strNum)) {
                              const newMutes = mutes.filter(num => num !== strNum);
                              track[0] = +`${baseLad}.${newMutes.sort().join('')}`;
                            } else {
                              return track.map((trace, tracei) => {
                                if (tracei === 0) return +`${baseLad}.${mutes.concat(strNum).sort().join('')}`;
                                if (!trace || trace < 0) return trace;
                                const points = ('' + trace).split('');
                                const strNumStr = '' + strNum;

                                if (points.includes(strNumStr)) {
                                  return +points.filter(point => point !== strNumStr).join('');
                                } else return trace;
                              });
                            }
                          });
                        }}
                      >
                        &times;
                      </text>
                      {lads.map(ladNum => {
                        const lad = track[ladNum] || 0;
                        const numStr = '' + strNum;

                        const strNumInLad = ('' + lad).indexOf(numStr);
                        const isPointed = lad > 0 && strNumInLad > -1;
                        const x = leftMargin + (ladNum * betweenLad - betweenLad / 2);
                        const isProblem =
                          isPointed &&
                          track
                            .slice(ladNum + 1)
                            .some(
                              lad =>
                                lad &&
                                (lad === -1 ||
                                  lad === -6 ||
                                  ('' + lad).includes(numStr) ||
                                  (lad < 0 && strNum > -lad / 10 && strNum < (-lad / 10 - Math.trunc(-lad / 10)) * 10)),
                            );

                        return (
                          <polyline
                            key={ladNum}
                            className={`chord-point shadow pointer${isProblem ? ' problem' : ''}`}
                            points={`${x},${y} ${x},${y}`}
                            onClick={() => {
                              modifyTrack(track => {
                                if (isPointed) {
                                  const digits = ('' + lad).split('');
                                  digits.splice(strNumInLad, 1);
                                  if (digits.length === 0) track[ladNum] = 0;
                                  else track[ladNum] = +digits.join('');
                                } else {
                                  if (lad === 0 || lad == null || lad < 1) track[ladNum] = strNum;
                                  else
                                    track[ladNum] = +('' + track[ladNum])
                                      .split('')
                                      .concat('' + strNum)
                                      .sort()
                                      .join('');

                                  if (mutes.includes(strNum)) {
                                    const newMutes = mutes.filter(num => num !== strNum);
                                    track[0] = +`${baseLad}.${newMutes.sort().join('')}`;
                                  }
                                }
                              });
                            }}
                          />
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </>
            );
          }}
        />
        {redactableChord.length < 6 && (
          <LazyIcon
            icon="PlusSignCircle"
            onClick={() => modifyTrack(track => track.push(0))}
          />
        )}
      </div>
    </>
  );
};
