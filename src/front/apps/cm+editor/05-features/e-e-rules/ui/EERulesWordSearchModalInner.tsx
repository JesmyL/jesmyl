import { DexiedValueSetter } from '#shared/lib/DexieDB';
import { ModalBody } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { CmEditorIDBStorage } from '$cm+editor/shared/state/cmEditorIDB';
import { useState } from 'react';
import { EeStorePack } from 'shared/api';
import styled from 'styled-components';
import { CmEditorEERulesWord } from './EERulesWord';

type Props = {
  editedWordsRef: { current: EeStorePack };
  eeStoreRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  setIgnoredWordsSet: DexiedValueSetter<CmEditorIDBStorage, 'ignoredEESet', void>;
  ignoredWordsSetRef: { current: Set<string> };
};

export const CmEditorEERulesWordSearchModalInner = ({
  editedWordsRef,
  setEditedWords,
  setIgnoredWordsSet,
  eeStoreRef,
  ignoredWordsSetRef,
}: Props) => {
  const [word, setWord] = useState('');

  return (
    <StyledModalBody>
      <TextInput
        value={word}
        onInput={setWord}
      />

      {word && (
        <CmEditorEERulesWord
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
};

const StyledModalBody = styled(ModalBody)`
  min-height: 30vmax;
`;
