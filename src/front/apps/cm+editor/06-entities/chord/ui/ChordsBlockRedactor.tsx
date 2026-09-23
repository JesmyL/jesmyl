import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  isDisabled: boolean;
  notEqLenInLine: string;
}

export const CmEditorChordBlockRedactor = ({ text, texti, ccom, isDisabled, notEqLenInLine }: Props) => {
  const [value, setValue] = useState(text);
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);
  const corrects = chordsBlockIncorrectMessage(value, isHardChords);

  return (
    <>
      <InputWithLoadingIcon
        multiline
        icon="Playlist03"
        inputClassName={isHardChords && !ccom.top.c1 ? 'bg-x2!' : 'bg-x1!'}
        defaultValue={text}
        strongDefaultValue
        onChanged={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={isDisabled}
      />
      {notEqLenInLine && (
        <CmEditorTextCorrectMessages
          corrects={{
            errors: [{ message: translateBase(it => it.cm.com.chLenHardLvlNotEq, { n: notEqLenInLine }) }],
          }}
        />
      )}
      <CmEditorTextCorrectMessages corrects={corrects} />
    </>
  );
};
