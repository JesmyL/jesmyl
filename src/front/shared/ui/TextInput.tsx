import { Input } from '#shared/components/ui/input';
import { Textarea } from '#shared/components/ui/textarea';
import { propagationStopper } from '#shared/lib/event-funcs';
import { mylib } from '#shared/lib/my-lib';
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react';

type Props = OmitOwn<
  AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
  'onChange' | 'onInput' | 'type' | 'label'
> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  strongDefaultValue?: boolean;
  selectOnFocus?: boolean;
  type?: 'text' | 'tel' | 'email' | 'number';
  label?: React.ReactNode;
  inputRef?:
    | React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>
    | React.RefCallback<(HTMLInputElement & HTMLTextAreaElement) | null>;
};

export const TextInput = ({
  onChanged,
  onInput,
  multiline,
  label,
  strongDefaultValue,
  selectOnFocus,
  ...props
}: Props) => {
  const localInputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const Comp = multiline ? Textarea : Input;
  const [firstValue, setFirstValue] = useState(`${props.defaultValue ?? props.value}`);

  const attrs: AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> = {
    ...props,
    onKeyDown: propagationStopper,
    onChange: onInput ? event => onInput(event.currentTarget.value) : undefined,
    onFocus: selectOnFocus
      ? event => {
          props.onFocus?.(event);
          event.currentTarget.select();
        }
      : props.onFocus,
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
      inputRef={elem => {
        localInputRef.current = elem;
        if (mylib.isFunc(props.inputRef)) props.inputRef(elem);
        else if (props.inputRef) props.inputRef.current = localInputRef.current;
      }}
    />
  ) : (
    <Comp
      {...(attrs as object)}
      ref={
        ((elem: HTMLInputElement & HTMLTextAreaElement) => {
          localInputRef.current = elem;
          if (mylib.isFunc(props.inputRef)) props.inputRef(elem);
          else if (props.inputRef) props.inputRef.current = localInputRef.current;
        }) as never
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
    if (mylib.isFunc(inputRef) || inputRef?.current == null) return;
    inputRef.current.value = '' + (props.defaultValue ?? '');
  }, [props.defaultValue, inputRef]);

  return (
    <Comp
      {...props}
      ref={inputRef}
    />
  );
};
