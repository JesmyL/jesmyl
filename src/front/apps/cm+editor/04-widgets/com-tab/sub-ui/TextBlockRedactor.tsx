import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { useState } from 'react';
import { CmEditorComTabRedactTextWithIncorrectMessage } from './RedactTextWithIncorrectMessage';

interface Props {
  texti: number;
  text: string;
  ccom: EditableCom;
  disabled?: boolean;
}

export const CmEditorComTabTextBlockRedactor = ({ texti, text, ccom, disabled }: Props) => {
  const [value, setValue] = useState(text);

  return (
    <CmEditorComTabRedactTextWithIncorrectMessage
      defaultValue={text}
      onChanged={value => ccom.changeTextBlock(texti, value)}
      onInput={setValue}
      disabled={disabled}
      text={value}
    />
  );
};
