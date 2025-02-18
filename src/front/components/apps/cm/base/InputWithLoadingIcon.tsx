import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { useActualRef } from 'front/08-shared/lib/hooks/useActualRef';
import { TheIconLoading } from 'front/08-shared/ui/the-icon/IconLoading';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CorrectsBox } from '../editor/corrects-box/CorrectsBox';

type Props<ChangedValue> = {
  onChange: (value: string) => Promise<ChangedValue>;
  onInput?: (value: string) => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  defaultValue: string;
  label?: string;
  icon: TheIconKnownName;
  multiline?: boolean;
  corrects?: CorrectsBox;
};

export const InputWithLoadingIcon = <ChangedValue,>({
  onChange,
  onInput,
  type,
  defaultValue,
  icon,
  label,
  multiline,
  corrects,
}: Props<ChangedValue>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const actualOnChange = useActualRef(onChange);
  const actualOnInput = useActualRef(onInput);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const isThereErrors = corrects?.errors?.length;

  useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    const setHeight = () => {
      inputNode.style.height = '1px';
      inputNode.style.height = `${inputNode.scrollHeight}px`;
    };

    if (multiline) setHeight();

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(multiline ? inputNode : null, 'input', setHeight),
        addEventListenerPipe(multiline ? inputNode : null, 'focus', setHeight),
        addEventListenerPipe(inputNode, 'change', async () => {
          if (isThereErrors || defaultValue === inputNode.value) return;
          setIsLoading(true);

          try {
            await actualOnChange.current(inputNode.value);
          } catch (e) {}

          setIsLoading(false);
        }),
      )
      .effect();
  }, [actualOnChange, actualOnInput, defaultValue, isThereErrors, multiline]);

  return (
    <div className="full-width flex flex-gap margin-gap-v">
      {isThereErrors ? (
        <LazyIcon
          icon="Alert02"
          className="color--ko"
        />
      ) : (
        <TheIconLoading
          icon={icon}
          isLoading={isLoading}
        />
      )}
      {label && <span className="nowrap">{label}</span>}
      {multiline ? (
        <StyledTextarea
          ref={inputRef as never}
          className="full-width pointer"
          value={value}
          onChange={event => {
            onInput?.(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      ) : (
        <StyledInput
          ref={inputRef}
          type={type}
          className="full-width pointer"
          value={value}
          onChange={event => {
            onInput?.(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      )}
    </div>
  );
};

const StyledInput = styled.input`
  background-color: var(--color--1);
`;

const StyledTextarea = styled.textarea`
  background-color: var(--color--1);
  resize: none;
`;
