import { Input } from '#shared/components/ui/input';
import { Textarea } from '#shared/components/ui/textarea';
import { propagationStopper } from '#shared/lib/event-funcs';
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react';

type Props = OmitOwn<
  AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
  'onChange' | 'onInput' | 'type' | 'label'
> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  strongDefaultValue?: boolean;
  type?: 'text' | 'tel' | 'email' | 'number';
  label?: React.ReactNode;
};

export const TextInput = ({ onChanged, onInput, multiline, label, strongDefaultValue, ...props }: Props) => {
  const Comp = multiline ? Textarea : Input;
  const [firstValue, setFirstValue] = useState(`${props.defaultValue ?? props.value}`);

  const attrs: AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> = {
    ...props,
    onKeyDown: propagationStopper,
    onChange: onInput ? event => onInput(event.currentTarget.value) : undefined,
    onBlur: onChanged
      ? event => {
          const value = event.currentTarget.value.trim();

          if (value !== firstValue) {
            onChanged(value);
            setFirstValue(value);
          }
          props.onBlur?.(event as never);
        }
      : undefined,
  };

  const node = strongDefaultValue ? (
    <StrongDefaultValueInput
      Comp={Comp}
      {...(attrs as object)}
    />
  ) : (
    <Comp {...(attrs as object)} />
  );

  return label ? (
    <label>
      {label}
      {node}
    </label>
  ) : (
    node
  );
};

const StrongDefaultValueInput = ({
  onChanged,
  onInput,
  multiline,
  label,
  strongDefaultValue,
  Comp,
  ...props
}: Props & { Comp: typeof Textarea | typeof Input }) => {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.value = '' + (props.defaultValue ?? '');
  }, [props.defaultValue]);

  return (
    <Comp
      {...props}
      ref={inputRef}
    />
  );
};
