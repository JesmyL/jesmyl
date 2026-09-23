import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmComIsChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { checkIsNumber } from 'shared/utils/checkIs';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  isDisabled: boolean;
  notEqLenInLine: boolean | number;
}

export const CmEditorChordBlockRedactor = ({ text, texti, ccom, isDisabled, notEqLenInLine }: Props) => {
  const [value, setValue] = useState(text);
  const isHardChords = useAtomValue(cmComIsChordHardLevelAtom);
  const corrects = chordsBlockIncorrectMessage(value, isHardChords);

  return (
    <>
      <InputWithLoadingIcon
        key={isHardChords}
        multiline
        icon="Playlist03"
        inputClassName="bg-x1!"
        defaultValue={text}
        strongDefaultValue
        onChanged={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={notEqLenInLine !== false || !!corrects.errors?.length}
        disabled={isDisabled}
      />
      {checkIsNumber(notEqLenInLine) && (
        <CmEditorTextCorrectMessages
          corrects={{
            errors: [{ message: translateBase(it => it.cm.com.chLenHardLvlNotEq, { n: notEqLenInLine + 1 }) }],
          }}
        />
      )}
      {notEqLenInLine === true && (
        <CmEditorTextCorrectMessages
          corrects={{
            errors: [{ message: translateBase(it => it.cm.com.chBlockLenHardLvlNotEq) }],
          }}
        />
      )}
      <CmEditorTextCorrectMessages corrects={corrects} />
    </>
  );
};
