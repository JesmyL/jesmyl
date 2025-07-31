import { AllHTMLAttributes, useState } from 'react';

export const TextInput = ({
  onChanged,
  onInput,
  ...props
}: OmitOwn<AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'onInput'> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
}) => {
  const [value, setValue] = useState('' + (props.value || ''));
  const onBlur =
    onChanged && props.onBlur
      ? (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
          props.onBlur!(event as never);
          if (value !== props.value) onChanged(value);
        }
      : props.onBlur;

  if (props.multiline)
    return (
      <textarea
        {...props}
        value={value}
        onInput={onInput && (event => setValue(event.currentTarget.value))}
        onBlur={onBlur}
      />
    );

  return (
    <input
      {...props}
      value={value}
      onInput={onInput && (event => setValue(event.currentTarget.value))}
      onBlur={onBlur}
    />
  );
};
