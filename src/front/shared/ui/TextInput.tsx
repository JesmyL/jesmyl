import { Input } from '#shared/components/ui/input';
import { Textarea } from '#shared/components/ui/textarea';
import { propagationStopper } from '#shared/lib/event-funcs';
import { AllHTMLAttributes, useEffect, useRef } from 'react';

type Props = OmitOwn<
  AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
  'onChange' | 'onInput' | 'type' | 'label'
> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  strongDefaultValue?: boolean;
  type?: 'text' | 'tel' | 'email';
  label?: React.ReactNode;
};

export const TextInput = ({ onChanged, onInput, multiline, label, strongDefaultValue, ...props }: Props) => {
  const Comp = multiline ? Textarea : Input;
  const attrs: AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> = {
    onKeyDown: propagationStopper,
    onChange: onInput ? event => onInput(event.currentTarget.value) : undefined,
    onBlur: onChanged
      ? event => {
          if (event.currentTarget.value !== props.value) onChanged(event.currentTarget.value);
          props.onBlur?.(event as never);
        }
      : undefined,
  };

  const node = strongDefaultValue ? (
    <StrongDefaultValueInput
      Comp={Comp}
      {...props}
      {...(attrs as object)}
    />
  ) : (
    <Comp
      {...props}
      {...(attrs as object)}
    />
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
    inputRef.current.value = '' + (props.defaultValue || '');
  }, [props.defaultValue]);

  return (
    <Comp
      {...props}
      ref={inputRef}
    />
  );
};
