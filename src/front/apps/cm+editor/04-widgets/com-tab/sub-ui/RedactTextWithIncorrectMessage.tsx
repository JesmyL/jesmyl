import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { pushComTextBlockToBuffer } from '$cm+editor/shared/lib/comBlockEditsBuffer';
import { useTextEeIncorrects } from '$cm+editor/shared/lib/useTextEeIncorrects';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { IIncorrect } from 'shared/model/cm/Incorrects';
import { replaceWordOccurrence } from 'shared/utils/cm/com/replaceWordOccurrence';
import { takeTextBlockLocalIncorrects } from 'shared/utils/cm/com/takeTextBlockLocalIncorrects';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';

type ErrorSetterProps = {
  setIsError: (isError: boolean) => void;
};

type Props = Omit<Parameters<typeof InputWithLoadingIcon>[0], 'icon'> &
  Partial<ErrorSetterProps> & { text: string; comw?: CmComWid; texti?: number };

export const CmEditorComTabRedactTextWithIncorrectMessage = ({
  text,
  setIsError,
  comw,
  texti,
  defaultValue: _defaultValue,
  ...props
}: Props) => {
  const { maxAvailableComLineLength } = useAtomValue(constantsConfigAtom);
  const lineLengthCorrects = textLinesLengthIncorrects(text, maxAvailableComLineLength);
  const localCorrects = takeTextBlockLocalIncorrects(text);
  const eeCorrects = useTextEeIncorrects(text);
  const corrects = lineLengthCorrects ?? localCorrects ?? eeCorrects;
  const isError = !!corrects.errors?.length;

  const onFixWord = (incorrect: IIncorrect) => {
    if (!incorrect.word || incorrect.correct == null) return;
    const next = replaceWordOccurrence(text, incorrect.word, incorrect.wordOccurrence ?? 0, incorrect.correct);

    if (comw != null && texti != null) pushComTextBlockToBuffer(comw, texti, text);

    props.onInput?.(next);
    void props.onChanged(next);
  };

  return (
    <>
      <InputWithLoadingIcon
        {...props}
        value={text}
        multiline
        icon="TextAlignLeft"
        inputClassName="bg-x1!"
        isError={isError}
      />
      <CmEditorTextCorrectMessages
        corrects={corrects}
        onFixWord={onFixWord}
      />
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
