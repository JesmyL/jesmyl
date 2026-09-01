import { Input } from '#shared/components/ui/input';
import { Textarea } from '#shared/components/ui/textarea';
import { propagationStopper } from '#shared/lib/event-funcs';
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react';
import { checkIsFunction } from 'shared/utils/checkIs';

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
  inputRef,
  ...props
}: Props) => {
  const Comp = multiline ? Textarea : Input;
  const [firstValue, setFirstValue] = useState(`${props.defaultValue ?? props.value}`);

  const attrs: AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> = {
    ...props,
    onKeyDown: onChanged
      ? event => {
          props.onKeyDown?.(event);
          propagationStopper(event);
        }
      : props.onKeyDown,
    onChange: onInput ? event => onInput(event.currentTarget.value) : undefined,
    onFocus: selectOnFocus
      ? event => {
          props.onFocus?.(event);
          event.currentTarget.select();
        }
      : props.onFocus,
    onBlur: onChanged
      ? event => {
          const value = event.currentTarget.value;

          if (value !== firstValue) {
            onChanged(value);
            setFirstValue(value);
          }
          props.onBlur?.(event as never);
        }
      : props.onBlur,
  };

  const node = strongDefaultValue ? (
    <StrongDefaultValueInput
      Comp={Comp}
      {...(attrs as object)}
      inputRef={inputRef}
    />
  ) : (
    <Comp
      {...(attrs as object)}
      ref={
        ((elem: (HTMLInputElement & HTMLTextAreaElement) | nil) => {
          if (elem == null) return;
          if (checkIsFunction(inputRef)) inputRef(elem);
          else if (inputRef) inputRef.current = elem;
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
  const localInputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (localInputRef?.current == null) return;
    localInputRef.current.value = '' + (props.defaultValue ?? '');
  }, [props.defaultValue]);

  return (
    <Comp
      {...props}
      ref={
        (inputRef == null
          ? localInputRef
          : (elem: (HTMLInputElement & HTMLTextAreaElement) | nil) => {
              if (elem == null) return;

              localInputRef.current = elem;
              if (checkIsFunction(inputRef)) inputRef(elem);
              else inputRef.current = localInputRef.current;
            }) as never
      }
    />
  );
};
