interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  term: string;
}

const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!event.ctrlKey && event.code.length !== 2) event.stopPropagation();
  if (event.code === 'Escape') event.currentTarget.blur();
};

export const BibleSearchPanelInput = ({ inputRef, term, onChange }: Props) => {
  return (
    <>
      <input
        ref={inputRef}
        className="bgcolor--2 full-width"
        value={term}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </>
  );
};
