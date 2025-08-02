import { mylib } from '#shared/lib/my-lib';
import { AllHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export const TextInput = ({
  onChanged,
  onInput,
  multiline,
  ...props
}: OmitOwn<AllHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, 'onChange' | 'onInput' | 'type'> & {
  onChanged?: (value: string) => void;
  onInput?: (value: string) => void;
  multiline?: boolean;
  type?: 'text' | 'tel' | 'email';
}) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const [value, setValue] = useState('' + (props.value || ''));

  const onBlur = onChanged
    ? (event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement, Element>) => {
        props.onBlur?.(event);
        if (value !== props.value) onChanged(value);
      }
    : props.onBlur;

  useEffect(() => setValue('' + props.value), [props.value]);

  useEffect(() => {
    if (!multiline || inputRef.current == null || value === '') return;
    mylib.setInputHeightByContent(inputRef.current);
  }, [multiline, value]);

  if (multiline)
    return (
      <StyledTextarea
        {...props}
        ref={inputRef}
        value={value}
        onInput={event => {
          setValue(event.currentTarget.value);
          onInput?.(event.currentTarget.value);
        }}
        onBlur={onBlur}
      />
    );

  return (
    <StyledInput
      {...props}
      ref={inputRef}
      type="text"
      value={value}
      onInput={event => {
        setValue(event.currentTarget.value);
        onInput?.(event.currentTarget.value);
      }}
      onBlur={onBlur}
    />
  );
};

const styledBoth = css`
  color: var(--color--3);

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
