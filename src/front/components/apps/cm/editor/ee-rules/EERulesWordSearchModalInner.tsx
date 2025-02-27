import { DexiedValueSetter } from '#shared/lib/DexieDB';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { CmIDBStorage } from '@cm/_db/cm-idb';
import { useState } from 'react';
import { EeStorePack } from 'shared/api';
import styled from 'styled-components';
import { EERulesWord } from './EERulesWord';

type Props = {
  editedWordsRef: { current: EeStorePack };
  eeStoreRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  setIgnoredWordsSet: DexiedValueSetter<CmIDBStorage, 'ignoredEESet', void>;
  ignoredWordsSetRef: { current: Set<string> };
};

export function EERulesWordSearchModalInner({
  editedWordsRef,
  setEditedWords,
  setIgnoredWordsSet,
  eeStoreRef,
  ignoredWordsSetRef,
}: Props) {
  const [word, setWord] = useState('');

  return (
    <StyledModalBody>
      <KeyboardInput
        value={word}
        onChange={setWord}
      />

      {word && (
        <EERulesWord
          key={word}
          word={word}
          eeStoreRef={eeStoreRef}
          ignoredWordsSetRef={ignoredWordsSetRef}
          setEditedWords={setEditedWords}
          editedWordsRef={editedWordsRef as never}
          setIgnoredWordsSet={setIgnoredWordsSet}
        />
      )}
    </StyledModalBody>
  );
}

const StyledModalBody = styled(ModalBody)`
  min-height: 30vmax;
`;
