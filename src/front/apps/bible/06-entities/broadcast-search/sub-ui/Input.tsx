interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  term: string;
}

const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!event.ctrlKey && event.code.length !== 2) event.stopPropagation();
  if (event.code === 'Escape') event.currentTarget.blur();
};

export const BibleBroadcastSearchPanelInput = ({ inputRef, term, onChange }: Props) => {
  return (
    <>
      <input
        ref={inputRef}
        className="bg-x2 w-full"
        value={term}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </>
  );
};
