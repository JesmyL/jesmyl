import { mylib } from '#shared/lib/my-lib';
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react';

export const TextInput = ({
  onChanged,
  onInput,
  ...props
}: OmitOwn<AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'onInput' | 'type'> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  type?: 'text' | 'tel' | 'email';
}) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const [value, setValue] = useState('' + (props.value || ''));
  const onBlur =
    onChanged && props.onBlur
      ? (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
          props.onBlur!(event as never);
          if (value !== props.value) onChanged(value);
        }
      : props.onBlur;

  useEffect(() => setValue('' + props.value), [props.value]);

  useEffect(() => {
    if (!props.multiline || inputRef.current == null || value === '') return;
    mylib.setInputHeightByContent(inputRef.current);
  }, [props.multiline, value]);

  if (props.multiline)
    return (
      <textarea
        {...props}
        ref={inputRef}
        value={value}
        onInput={event => {
          setValue(event.currentTarget.value);
          onInput?.(event.currentTarget.value);
        }}
        onBlur={onBlur}
      />
    );

  return (
    <input
      {...props}
      ref={inputRef}
      type="text"
      value={value}
      onInput={event => {
        setValue(event.currentTarget.value);
        onInput?.(event.currentTarget.value);
      }}
      onBlur={onBlur}
    />
  );
};
