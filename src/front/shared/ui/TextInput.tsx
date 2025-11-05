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
  inputRef?: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
};

export const TextInput = ({ onChanged, onInput, multiline, label, strongDefaultValue, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  if (props.inputRef) {
    props.inputRef.current = inputRef.current;
  }
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
  inputRef,
  ...props
}: Props & { Comp: typeof Textarea | typeof Input }) => {
  useEffect(() => {
    if (inputRef?.current == null) return;
    inputRef.current.value = '' + (props.defaultValue ?? '');
  }, [props.defaultValue, inputRef]);

  return (
    <Comp
      {...props}
      ref={inputRef}
    />
  );
};
