import { ModalBody } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { useState } from 'react';
import { EeStorePack } from 'shared/api';
import styled from 'styled-components';
import { CmEditorEERulesWord } from './EERulesWord';

type Props = {
  editedWordsRef: { current: EeStorePack };
  eeStoreRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  ignoredWordsSetRef: { current: Set<string> };
};

export const CmEditorEERulesWordSearchModalInner = ({
  editedWordsRef,
  setEditedWords,
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
        />
      )}
    </StyledModalBody>
  );
};

const StyledModalBody = styled(ModalBody)`
  min-height: 30vmax;
`;
