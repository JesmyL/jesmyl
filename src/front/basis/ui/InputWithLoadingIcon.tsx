import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect, useRef, useState } from 'react';
import { StameskaIconName } from 'stameska-icon';
import styled, { css } from 'styled-components';

type Props<ChangedValue> = {
  onChange: (value: string) => Promise<ChangedValue>;
  onInput?: (value: string) => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  defaultValue: string;
  label?: string;
  placeholder?: string;
  icon: StameskaIconName;
  multiline?: boolean;
  isError?: boolean;
};

export const InputWithLoadingIcon = <ChangedValue,>({
  onChange,
  onInput,
  type,
  defaultValue,
  icon,
  label,
  multiline,
  isError,
  placeholder,
}: Props<ChangedValue>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const actualOnChange = useActualRef(onChange);
  const actualOnInput = useActualRef(onInput);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

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
          if (isError || defaultValue === inputNode.value) return;
          setIsLoading(true);

          try {
            await actualOnChange.current(inputNode.value);
          } catch (_error) {
            //
          }

          setIsLoading(false);
        }),
      )
      .effect();
  }, [actualOnChange, actualOnInput, defaultValue, isError, multiline]);

  return (
    <div className="full-width flex flex-gap margin-gap-v">
      {isError ? (
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
          placeholder={placeholder}
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
          placeholder={placeholder}
          onChange={event => {
            onInput?.(event.currentTarget.value);
            setValue(event.currentTarget.value);
          }}
        />
      )}
    </div>
  );
};

const style = css`
  background-color: var(--color--1);

  &::placeholder {
    color: var(--color--4);
    opacity: 0.5;
  }
`;

const StyledInput = styled.input`
  ${style}
`;

const StyledTextarea = styled.textarea`
  ${style}
  resize: none;
`;
