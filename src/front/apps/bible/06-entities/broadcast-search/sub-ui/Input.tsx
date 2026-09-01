import { TextInput } from '#shared/ui/TextInput';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
  onChange: (value: string) => void;
  term: string;
}

const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!event.ctrlKey && event.code.length !== 2) event.stopPropagation();
  if (event.code === 'Escape') event.currentTarget.blur();
};

export const BibleBroadcastSearchPanelInput = ({ inputRef, term, onChange }: Props) => {
  return (
    <>
      <TextInput
        inputRef={inputRef}
        value={term}
        onKeyDown={onKeyDown}
        onInput={onChange}
      />
    </>
  );
};
