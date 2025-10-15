import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { cmConstantsConfigAtom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComUtils } from 'shared/utils/cm/ComUtils';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  disabled?: boolean;
}

export const CmEditorComTabTextBlockRedactor = ({ texti, text, ccom, disabled }: Props) => {
  const [value, setValue] = useState(text);
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(cmConstantsConfigAtom);
  const lineLengthCorrects = CmComUtils.textLinesLengthIncorrects(value, maxAvailableComLineLength);
  const corrects = lineLengthCorrects ?? CmComUtils.takeTextBlockIncorrects(value, eeStore);

  return (
    <>
      <InputWithLoadingIcon
        multiline
        icon="TextAlignLeft"
        label=""
        className="bg-x1!"
        defaultValue={text}
        strongDefaultValue
        onChanged={value => ccom.changeTextBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={disabled}
      />
      <CmEditorTextCorrectMessages corrects={corrects} />
    </>
  );
};
