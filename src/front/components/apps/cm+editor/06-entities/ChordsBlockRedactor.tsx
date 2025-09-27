import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { useState } from 'react';
import { CmComUtils } from 'shared/utils/cm/ComUtils';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  isDisabled: boolean;
}

export const CmChordsBlockRedactor = ({ text, texti, ccom, isDisabled }: Props) => {
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
        onChanged={value => ccom.changeChordsBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={isDisabled}
      />
      <TextCorrectMessages corrects={corrects} />
    </>
  );
};
