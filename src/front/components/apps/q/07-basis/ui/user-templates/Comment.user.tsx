import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { TextInput } from '#shared/ui/TextInput';
import { useEffect, useState } from 'react';
import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps } from 'shared/model/q/answer';

export const QuestionerUserCommentTemplateCardContent = ({
  onUpdate,
  userAnswer,
}: QuestionerUserAnswerContentProps<QuestionerType.Comment>) => {
  const [value, setValue] = useState(userAnswer?.v);
  const debounceValue = useDebounceValue(value);

  useEffect(() => {
    onUpdate(() => debounceValue || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => setValue(userAnswer?.v || ''), [userAnswer]);

  return (
    <>
      <TextInput
        multiline
        value={value}
        onInput={setValue}
      />
    </>
  );
};
