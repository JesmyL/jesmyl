import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { AllHTMLAttributes, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

export const TextInput = ({
  onChanged,
  onInput,
  multiline,
  value,
  type,
  ...props
}: OmitOwn<AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'onInput' | 'type'> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  type?: 'text' | 'tel' | 'email';
}) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);

  useEffect(() => {
    if (inputRef.current == null) return;
    const inputNode = inputRef.current;
    if (multiline) mylib.setInputHeightByContent(inputNode);
    if (value !== undefined) inputNode.value = '' + value;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputNode, 'input', event => {
          onInput?.('' + ((event.target as never as { value: string })?.value || ''));
          if (multiline) mylib.setInputHeightByContent(inputNode);
        }),
        onChanged &&
          addEventListenerPipe(inputNode, 'blur', () => {
            if (inputNode.value !== value) onChanged(inputNode.value);
          }),
      )
      .effect();
  }, [multiline, onChanged, onInput, value]);

  if (multiline)
    return (
      <StyledTextarea
        {...props}
        ref={inputRef}
      />
    );

  return (
    <StyledInput
      {...props}
      ref={inputRef}
      type={type}
    />
  );
};

const styledBoth = css`
  color: var(--color--3);
  ${'field-sizing: content;'}
  min-height: 2lh;

  &::placeholder {
    color: var(--color--4);
  }

  &.mood-2 {
    background-color: var(--color--2);
  }

  &.mood-1 {
    background-color: var(--color--1);
  }
`;

const StyledTextarea = styled.textarea`
  padding-right: 30px;
  width: 100%;
  height: 100%;
  resize: none;
  text-align: inherit;

  ${styledBoth}
`;

const StyledInput = styled.input`
  ${styledBoth}
`;
