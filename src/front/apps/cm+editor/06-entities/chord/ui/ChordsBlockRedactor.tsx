import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useState } from 'react';
import { CmComUtils } from 'shared/utils/cm/ComUtils';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  isDisabled: boolean;
}

export const CmEditorChordBlockRedactor = ({ text, texti, ccom, isDisabled }: Props) => {
  const [value, setValue] = useState(text);
  const corrects = CmComUtils.chordsBlockIncorrectMessage(value);

  return (
    <>
      <InputWithLoadingIcon
        multiline
        icon="Playlist03"
        label=""
        className="bg-x1!"
        defaultValue={text}
        strongDefaultValue
        onChanged={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={isDisabled}
      />
      <CmEditorTextCorrectMessages corrects={corrects} />
    </>
  );
};
