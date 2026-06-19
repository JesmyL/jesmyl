import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { takeTextBlockIncorrects } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';

type ErrorSetterProps = {
  setIsError: (isError: boolean) => void;
};

type Props = Omit<Parameters<typeof InputWithLoadingIcon>[0], 'icon'> & Partial<ErrorSetterProps> & { text: string };

export const CmEditorComTabRedactTextWithIncorrectMessage = ({ text, setIsError, ...props }: Props) => {
  const eeStore = cmEditorIDB.useValue.eeStore();
  const { maxAvailableComLineLength } = useAtomValue(constantsConfigAtom);
  const lineLengthCorrects = textLinesLengthIncorrects(text, maxAvailableComLineLength);
  const corrects = lineLengthCorrects ?? takeTextBlockIncorrects(text, eeStore);
  const isError = !!corrects.errors?.length;

  return (
    <>
      <InputWithLoadingIcon
        {...props}
        multiline
        icon="TextAlignLeft"
        inputClassName="bg-x1!"
        strongDefaultValue
        isError={isError}
      />
      <CmEditorTextCorrectMessages corrects={corrects} />
      {setIsError && (
        <ErrorSetter
          is={isError}
          setIsError={setIsError}
        />
      )}
    </>
  );
};

const ErrorSetter = ({ setIsError, is }: ErrorSetterProps & { is: boolean }) =>
  useEffect(() => setIsError(is), [is, setIsError]) as never;
