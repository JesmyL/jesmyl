import { DexiedValueSetter } from '#shared/lib/DexieDB';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { TextInput } from '#shared/ui/TextInput';
import { CmEditorIDBStorage } from '$cm+editor/basis/lib/cmEditorIDB';
import { EERulesWord } from '$cm+editor/entities/EERulesWord';
import { useState } from 'react';
import { EeStorePack } from 'shared/api';
import styled from 'styled-components';

type Props = {
  editedWordsRef: { current: EeStorePack };
  eeStoreRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  setIgnoredWordsSet: DexiedValueSetter<CmEditorIDBStorage, 'ignoredEESet', void>;
  ignoredWordsSetRef: { current: Set<string> };
};

export const EERulesWordSearchModalInner = ({
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
        onChanged={setWord}
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
};

const StyledModalBody = styled(ModalBody)`
  min-height: 30vmax;
`;
