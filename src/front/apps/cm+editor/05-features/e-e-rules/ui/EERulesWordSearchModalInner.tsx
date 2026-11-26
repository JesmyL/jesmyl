import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { ModalBody } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { useEeWordsSlice } from '$cm+editor/shared/lib/useEeWordsSlice';
import { useState } from 'react';
import { EeStorePack } from 'shared/api';
import { CmEditorEERulesWord } from './EERulesWord';

type Props = {
  editedWordsRef: { current: EeStorePack };
  setEditedWords: (setter: (words: EeStorePack) => EeStorePack) => void;
  ignoredWordsSetRef: { current: Set<string> };
};

export const CmEditorEERulesWordSearchModalInner = ({ editedWordsRef, setEditedWords, ignoredWordsSetRef }: Props) => {
  const [word, setWord] = useState('');
  const eeStoreRef = useActualRef(useEeWordsSlice(word ? [word] : []));

  return (
    <ModalBody className="min-h-[30vmax]">
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
          editedWordsRef={editedWordsRef}
        />
      )}
    </ModalBody>
  );
};
