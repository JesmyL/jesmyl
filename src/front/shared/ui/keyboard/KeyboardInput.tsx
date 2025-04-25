import { indexSimpleValIsUseNativeKeyboard } from 'front/components/index/complect/index.simpleValues';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { makeRegExp } from 'regexp-master';
import styled from 'styled-components';
import { LazyIcon } from '../the-icon/LazyIcon';
import { KeyboardInputProps } from './Keyboard.model';
import './Keyboard.scss';
import { KeyboardInputStorage } from './KeyboardStorage';
import { keyboardInputGlobals } from './lib';

const stopCb = (event: PropagationStopperEvent) => event.stopPropagation();

export function KeyboardInput(props: KeyboardInputProps) {
  const input = useMemo(() => new KeyboardInputStorage(), []);
  const [updates, setUpdates] = useState(0);
  const nativeRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isForceZero, setIsForceZero] = useState(false);

  useEffect(() => setValue(props.value), [props.value]);
  useEffect(() => {
    let newVal: string | und;

    if (props.type === 'number') {
      if (!value) setValue((newVal = '0'));
      else if (value.match(makeRegExp('/\\D/'))) setValue((newVal = '0'));
    } else if (value === '0' && props.value !== '0') setValue((newVal = ''));

    if (newVal !== undefined) props.onChange?.(newVal, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  useEffect(() => {
    if (!indexSimpleValIsUseNativeKeyboard.get() && value) input.replaceAll(value, false, true);
  }, [value, input]);

  const valueGetterSetter = (set?: string) => {
    if (keyboardInputGlobals.currentInput !== undefined) {
      if (set !== undefined) keyboardInputGlobals.currentInput.replaceAll(set);
      return keyboardInputGlobals.currentInput.value;
    }

    if (nativeRef.current != null) {
      if (set !== undefined) nativeRef.current.value = set;
      return nativeRef.current.value;
    }

    return '';
  };
  if (indexSimpleValIsUseNativeKeyboard.get() || props.type === 'button') {
    let isCanBlur = true;
    const {
      className,
      multiline,
      onInput,
      onChange,
      onPaste,
      onFocus,
      type,
      withoutCloseButton,
      setIsUnknownSymbols,
      mapChar,
      preferLanguage,
      ...otherProps
    } = props;
    const invoke = (callback: (value: string, prev: string | nil) => void, text: string) => {
      if (type === 'number') {
        if (text === '00') setIsForceZero(true);
        else if (!text) setIsForceZero(false);

        const val =
          (value === '0' && !isForceZero ? text.replace(makeRegExp('/^0/'), '') : text).replace(
            makeRegExp('/\\D+/g'),
            '',
          ) || '0';
        callback(val, value?.replace(makeRegExp('/\\D+/g'), '') || '0');
        setValue(val);
      } else {
        callback(text, value);
        setValue(text);
      }
    };

    const nativeProps = {
      className: 'native-input input ',
      onClick: (
        event: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.FocusEvent<HTMLTextAreaElement, Element>,
      ) => {
        event.stopPropagation();
        otherProps.onClick?.({
          name: 'click',
          blur: () => nativeRef.current?.blur(),
          stopPropagation: event.stopPropagation,
          realEvent: event,
          value: valueGetterSetter,
        });
      },
      onInput:
        onInput &&
        ((
          event: React.MouseEvent<HTMLTextAreaElement, MouseEvent> | React.FocusEvent<HTMLTextAreaElement, Element>,
        ) => {
          invoke(onInput, event.currentTarget.value);
        }),
      onChange:
        onChange &&
        ((event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
          invoke(onChange, event.currentTarget.value);
        }),
      onPaste:
        onPaste &&
        (async () => {
          try {
            invoke(onPaste, await navigator.clipboard.readText());
          } catch (_error) {
            //
          }
        }),
      onFocus:
        onFocus &&
        ((event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
          onFocus({
            name: 'focus',
            blur: () => nativeRef.current?.blur(),
            stopPropagation: event.stopPropagation,
            realEvent: event,
            value: valueGetterSetter,
          });
        }),
      value: value || '',
      ref: nativeRef,
    };

    let inputNode = null;

    if (multiline) {
      inputNode = (
        <StyledTextarea
          {...(otherProps as never as { value: string })}
          {...(nativeProps as never as { value: string })}
          onBlur={
            otherProps.onBlur &&
            (() => {
              if (isCanBlur) otherProps.onBlur?.();
            })
          }
        />
      );
    } else {
      inputNode = (
        <input
          {...(otherProps as never as { value: string })}
          {...(nativeProps as never as { value: string })}
          onBlur={
            otherProps.onBlur &&
            (() => {
              if (isCanBlur) otherProps.onBlur?.();
            })
          }
          type={type === 'password' && !isHiddenPassword ? 'text' : type}
        />
      );
    }

    return (
      <div
        className={
          'input-keyboard-flash-controlled input with-native-input ' +
          (className || '') +
          (multiline ? ' multiline' : '') +
          (withoutCloseButton ? ' without-close-button' : '')
        }
        onTouchStart={stopCb}
      >
        {inputNode}
        {type !== 'button' && value && (
          <div className="icon-button-container">
            {type === 'password' ? (
              <LazyIcon
                icon={isHiddenPassword ? 'View' : 'ViewOff'}
                onMouseDown={() => setIsHiddenPassword(is => !is)}
              />
            ) : (
              !withoutCloseButton &&
              (type !== 'number' || isForceZero || value !== '0') && (
                <LazyIcon
                  icon="Cancel01"
                  className="close-button pointer"
                  onMouseDown={() => {
                    isCanBlur = false;

                    if (nativeRef.current) {
                      const value = nativeRef.current.value;

                      nativeRef.current.focus();
                      setTimeout(() => nativeRef.current?.focus());

                      setTimeout(() => {
                        setIsForceZero(false);
                        const val = type === 'number' ? '0' : '';
                        onChange?.(val, value || '');
                        onInput?.(val, value || '');
                        setValue(val);
                      });
                    }
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    );
  }

  return input.node(
    props,
    () => {
      setUpdates(updates + 1);
      keyboardInputGlobals.topForceUpdate();
    },
    () => {
      keyboardInputGlobals.currentInput?.blur();
      keyboardInputGlobals.topForceUpdate();
      keyboardInputGlobals.topOnBlur();
      props.onBlur?.();
    },
    () => {
      keyboardInputGlobals.currentInput?.blur(input !== keyboardInputGlobals.currentInput);
      keyboardInputGlobals.currentInput = input;
      keyboardInputGlobals.topOnFocus(keyboardInputGlobals.currentInput);
      props.onFocus?.({
        name: 'focus',
        blur: () => input.blur(),
        stopPropagation: () => {},
        realEvent: null,
        value: valueGetterSetter,
      });
    },
  );
}

const StyledTextarea = styled.textarea`
  field-sizing: content;
  min-height: 2lh;
`;
