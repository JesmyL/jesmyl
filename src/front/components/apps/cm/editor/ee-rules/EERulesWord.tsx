import { mylib } from 'front/utils';
import { memo, useState } from 'react';
import { itIt, makeRegExp } from 'shared/utils';
import styled from 'styled-components';
import IconCheckbox from '../../../../../complect/the-icon/IconCheckbox';
import { eeStorage } from '../../base/ee-storage/EeStorage';
import { EeStorageStoreType } from '../../base/ee-storage/EeStorage.model';

const radioTitles = ['е/ё', 'е!!', 'ё!!'].map((typeName, type) => <div key={type}>{typeName}</div>);

const textAlignStyle = {
  textAlign: 'right',
} as const;

export const EERulesWord = memo(
  ({
    word,
    setEditedWords,
  }: {
    word: string;
    setEditedWords: (setter: (words: EeStorageStoreType) => EeStorageStoreType) => void;
  }) => {
    const [trackState, setTrackState] = useState(eeStorage.get(word));
    const parts = word.split(makeRegExp('/([а-дж-я]*е)/')).filter(itIt);
    const typesLine = mylib.isArr(trackState) ? trackState : [trackState];
    const isVariated = mylib.isArr(trackState) ? trackState.includes(0) : !trackState;

    if (trackState != null) console.log(typesLine);

    return (
      <StyledTable className="margin-big-gap-v">
        <tbody>
          <StyledWordTr>
            <th className={trackState == null ? 'color--ko' : 'color--ok'}>Слово:</th>
            {parts.map((part, parti) => (
              <th key={parti}>
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
            <th>{radioTitles}</th>
            {parts.map((part, parti) => (
              <td
                key={parti}
                style={textAlignStyle}
              >
                <StyledCheckboxesTd>
                  {part.endsWith('е') &&
                    radioTitles.map((_, type) => (
                      <IconCheckbox
                        key={type}
                        checked={typesLine[parti] === type}
                        disabled={typesLine[parti] === type}
                        onChange={() => {
                          let track = Array.isArray(trackState) ? trackState.slice(0) : trackState;
                          const elen = word.match(makeRegExp('/е/g'))?.length || 0;

                          if (trackState == null) {
                            if (elen > 1) {
                              track = '.'
                                .repeat(elen)
                                .split('')
                                .map(() => 1);
                              track[parti] = type;
                            } else track = type;
                          } else {
                            if (elen > 1) (track as number[])[parti] = type;
                            else track = type;
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
  font-size: 2em;
`;

const StyledWordTr = styled.tr`
  height: 3em;
`;
