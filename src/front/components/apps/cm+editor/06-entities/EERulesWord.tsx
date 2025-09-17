import { DexiedValueSetter } from '#shared/lib/DexieDB';
import { mylib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorIDBStorage } from '$cm+editor/basis/lib/cmEditorIDB';
import { memo, useReducer, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { EeStorePack } from 'shared/api';
import { itIt, itNIt } from 'shared/utils';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

const radioTitles = ['е/ё', 'е!!', 'ё!!'].map((typeName, type) => <div key={type}>{typeName}</div>);

const textAlignStyle = { textAlign: 'right' } as const;

type Props = {
  word: string;
  editedWordsRef: { current: EeStorePack };
  eeStoreRef: { current: EeStorePack };
  ignoredWordsSetRef: { current: Set<string> };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  setIgnoredWordsSet: DexiedValueSetter<CmEditorIDBStorage, 'ignoredEESet', void>;
};

const forceUpdater = (prev: number) => prev + 1;

export const EERulesWord = memo(
  ({ word, setEditedWords, editedWordsRef, setIgnoredWordsSet, eeStoreRef, ignoredWordsSetRef }: Props) => {
    const [, forceUpdate] = useReducer(forceUpdater, 0);
    const trackState = editedWordsRef.current[word] ?? eeStoreRef.current[word];
    const [isIgnored, setIsIgnored] = useState(ignoredWordsSetRef.current.has(word));
    const parts = word.split(makeRegExp('/([а-дж-я]*е)/')).filter(itIt);
    const typesLine = mylib.isArr(trackState) ? trackState : [trackState];
    const isVariated = mylib.isArr(trackState) ? trackState.includes(0) : !trackState;

    return (
      <StyledTable className="mx-5">
        <tbody>
          <StyledWordTr>
            {parts.map((part, parti) => (
              <th
                key={parti}
                className={trackState == null ? undefined : 'text-xOK'}
              >
                {isVariated && <div>{part}</div>}
                <div>
                  {part.endsWith('е') &&
                  (mylib.isArr(trackState)
                    ? typesLine[parti] === 2 || !typesLine[parti]
                    : !trackState || trackState === 2)
                    ? part.slice(0, -1) + 'ё'
                    : part}
                </div>
              </th>
            ))}

            {eeStoreRef.current[word] === undefined && (
              <th>
                <TheIconButton
                  icon={isIgnored ? 'PlusSignCircle' : 'Cancel02'}
                  className={twMerge('m-2', isIgnored ? 'text-xOK' : 'text-xKO')}
                  onClick={() => {
                    setIgnoredWordsSet(prev => {
                      const news = new Set(prev);
                      if (isIgnored) news.delete(word);
                      else news.add(word);
                      return news;
                    });

                    setIsIgnored(itNIt);

                    setEditedWords(prev => {
                      const news = { ...prev };
                      delete news[word];
                      return news;
                    });
                    forceUpdate();
                  }}
                />
              </th>
            )}
          </StyledWordTr>
          <tr className={isIgnored ? 'disabled' : undefined}>
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

                          forceUpdate();

                          setEditedWords(prev => {
                            if (mylib.isEq(eeStoreRef.current[word], track)) {
                              const news = { ...prev };
                              delete news[word];
                              return news;
                            } else {
                              return { ...prev, [word]: track };
                            }
                          });
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
