import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { cmConstantsConfigAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { TextCorrectMessages } from './TextBlockIncorrectMessages';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  disabled?: boolean;
}

export const CmTextBlockRedactor = ({ texti, text, ccom, disabled }: Props) => {
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
        onChange={value => ccom.changeTextBlock(texti, value)}
        onInput={setValue}
        isError={!!corrects.errors?.length}
        disabled={disabled}
      />
      <TextCorrectMessages corrects={corrects} />
    </>
  );
};
