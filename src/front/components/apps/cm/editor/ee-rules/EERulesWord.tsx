import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { eeStorage } from '@cm/base/ee-storage/EeStorage';
import { memo, useState } from 'react';
import { EeStorePack } from 'shared/api';
import { itIt, makeRegExp } from 'shared/utils';
import styled from 'styled-components';

const radioTitles = ['е/ё', 'е!!', 'ё!!'].map((typeName, type) => <div key={type}>{typeName}</div>);

const textAlignStyle = {
  textAlign: 'right',
} as const;

export const EERulesWord = memo(
  ({
    word,
    setEditedWords,
    editedWordsRef,
  }: {
    word: string;
    setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
    editedWordsRef: { current: EeStorePack };
  }) => {
    const [trackState, setTrackState] = useState(editedWordsRef.current[word] ?? eeStorage.get(word));
    const parts = word.split(makeRegExp('/([а-дж-я]*е)/')).filter(itIt);
    const typesLine = mylib.isArr(trackState) ? trackState : [trackState];
    const isVariated = mylib.isArr(trackState) ? trackState.includes(0) : !trackState;

    return (
      <StyledTable className="margin-big-gap-v">
        <tbody>
          <StyledWordTr>
            {parts.map((part, parti) => (
              <th
                key={parti}
                className={trackState == null ? undefined : 'color--ok'}
              >
                <>
                  {isVariated && <div>{part}</div>}
                  <div>
                    {part.endsWith('е') &&
                    (mylib.isArr(trackState)
                      ? typesLine[parti] === 2 || !typesLine[parti]
                      : !trackState || trackState === 2)
                      ? part.slice(0, -1) + 'ё'
                      : part}
                  </div>
                </>
              </th>
            ))}
          </StyledWordTr>
          <tr>
            {parts.map((part, parti) => (
              <td
                key={parti}
                style={textAlignStyle}
              >
                <StyledCheckboxesTd>
                  {part.endsWith('е') &&
                    radioTitles.map((type, typei) => (
                      <StyledIconCheckbox
                        key={typei}
                        checked={typesLine[parti] === typei}
                        disabled={typesLine[parti] === typei}
                        prefix={type}
                        onChange={() => {
                          let track = Array.isArray(trackState) ? trackState.slice(0) : trackState;
                          const elen = word.match(makeRegExp('/е/g'))?.length || 0;

                          if (trackState == null) {
                            if (elen > 1) {
                              track = '.'
                                .repeat(elen)
                                .split('')
                                .map(() => 1);
                              track[parti] = typei;
                            } else track = typei;
                          } else {
                            if (elen > 1) (track as number[])[parti] = typei;
                            else track = typei;
                          }

                          setTrackState(track);
                          setEditedWords(prev => ({ ...prev, [word]: track }));
                        }}
                      />
                    ))}
                </StyledCheckboxesTd>
              </td>
            ))}
          </tr>
        </tbody>
      </StyledTable>
    );
  },
);

const StyledIconCheckbox = styled(IconCheckbox)`
  font-size: 0.5em;
`;

const StyledCheckboxesTd = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;

  > * {
    --mb: 0.2em;
    margin: var(--mb) 0 var(--mb) 0;
  }
`;

const StyledTable = styled.table`
  font-size: 1.5em;
`;

const StyledWordTr = styled.tr`
  height: 3em;
`;
