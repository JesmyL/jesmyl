import { Input } from '#shared/components/ui/input';
import { Textarea } from '#shared/components/ui/textarea';
import { propagationStopper } from '#shared/lib/event-funcs';
import { AllHTMLAttributes } from 'react';

export const TextInput = ({
  onChanged,
  onInput,
  value,
  multiline,
  label,
  ...props
}: OmitOwn<AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'onInput' | 'type' | 'label'> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  type?: 'text' | 'tel' | 'email';
  label?: React.ReactNode;
}) => {
  const Comp = multiline ? Textarea : Input;
  const node = (
    <Comp
      {...props}
      onKeyDown={propagationStopper}
      onInput={onInput ? event => onInput(event.currentTarget.value) : undefined}
      onBlur={
        onChanged
          ? event => {
              if (event.currentTarget.value !== value) onChanged(event.currentTarget.value);
              props.onBlur?.(event as never);
            }
          : undefined
      }
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
