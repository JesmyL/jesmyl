import React, { ReactNode, memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/store';
import propsOfClicker from '../clicker/propsOfClicker';
import EvaIcon, { EvaIconName } from '../eva-icon/EvaIcon';
import { keyboardKeyDict, keyboardNumberScreenLines } from './Keyboard.complect';
import { KeyboardInputProps } from './Keyboard.model';
import './Keyboard.scss';
import { KeyboardInputStorage } from './KeyboardStorage';

let currentInput: KeyboardInputStorage;
let topForceUpdate: () => void = () => {};
let topOnBlur: () => void = () => {};
let topOnFocus: (currentInput: KeyboardInputStorage | nil) => void = () => {};
const isUseNativeKeyboardSelector = (state: RootState) => state.index.isUseNativeKeyboard;

export default function KeyboardInput(props: KeyboardInputProps) {
  const input = useMemo(() => new KeyboardInputStorage(), []);
  const isNative = useSelector(isUseNativeKeyboardSelector);
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
      else if (value.match(/\D/)) setValue((newVal = '0'));
    } else if (value === '0' && props.value !== '0') setValue((newVal = ''));

    if (newVal !== undefined) props.onChange?.(newVal, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  useEffect(() => {
    !isNative && value && input.replaceAll(value, false, true);
  }, [value, input, isNative]);

  const valueGetterSetter = (set?: string) => {
    if (currentInput !== undefined) {
      if (set !== undefined) currentInput.replaceAll(set);
      return currentInput.value;
    }

    if (nativeRef.current != null) {
      if (set !== undefined) nativeRef.current.value = set;
      return nativeRef.current.value;
    }

    return '';
  };
  if (isNative || props.type === 'button') {
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

        const val = (value === '0' && !isForceZero ? text.replace(/^0/, '') : text).replace(/\D+/g, '') || '0';
        callback(val, value?.replace(/\D+/g, '') || '0');
        setValue(val);
      } else {
        callback(text, value);
        setValue(text);
      }
    };

    const nativeProps = {
      className: 'native-input input ',
      onClick: (event: any) => {
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
        ((event: any) => {
          invoke(onInput, event.target.value);
        }),
      onChange:
        onChange &&
        ((event: any) => {
          invoke(onChange, event.target.value);
        }),
      onPaste:
        onPaste &&
        (async () => {
          invoke(onPaste, await navigator.clipboard.readText());
        }),
      onFocus:
        onFocus &&
        ((event: any) => {
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
      const rows = multiline ? value?.split('\n').length : 1;

      inputNode = (
        <textarea
          {...otherProps}
          {...(nativeProps as any)}
          onBlur={
            otherProps.onBlur &&
            (() => {
              isCanBlur && otherProps.onBlur?.();
            })
          }
          rows={rows && rows < 2 ? 2 : rows}
        />
      );
    } else {
      inputNode = (
        <input
          {...otherProps}
          {...(nativeProps as any)}
          onBlur={
            otherProps.onBlur &&
            (() => {
              isCanBlur && otherProps.onBlur?.();
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
      >
        {inputNode}
        {type !== 'button' && value && (
          <div className="icon-button-container">
            {type === 'password' ? (
              <EvaIcon
                name={isHiddenPassword ? 'eye-outline' : 'eye-off-outline'}
                onMouseDown={() => setIsHiddenPassword(is => !is)}
              />
            ) : (
              !withoutCloseButton &&
              (type !== 'number' || isForceZero || value !== '0') && (
                <EvaIcon
                  name="close"
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
      topForceUpdate();
    },
    () => {
      currentInput?.blur();
      topForceUpdate();
      topOnBlur();
      props.onBlur?.();
    },
    () => {
      currentInput?.blur(input !== currentInput);
      currentInput = input;
      topOnFocus(currentInput);
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

export const KEYBOARD_FLASH = memo(function ({
  onBlur,
  onFocus,
}: {
  onBlur: () => void;
  onFocus: (currentInput: KeyboardInputStorage | nil) => void;
}) {
  const [updates, setUpdates] = useState(0);
  const [moreClosed, setMoreClosed] = useState(true);
  const [keyInFix, setKeyInFix] = useState<string | null>(null);
  const isNative = useSelector(isUseNativeKeyboardSelector);
  topForceUpdate = () => setUpdates(updates + 1);
  topOnBlur = () => onBlur();
  topOnFocus = () => onFocus(currentInput);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
      currentInput?.onOverflowMouseDown();
    };
    const onMouseUp = () => {
      currentInput?.onOverflowMouseUp();
      setKeyInFix(null);
    };
    const onKeyDown = (event: KeyboardEvent) => currentInput?.onOverflowKeyDown(event);
    const onKeyUp = () => currentInput?.onOverflowKeyUp();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      currentInput?.blur();
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  if (isNative) return null;

  const keyNode = (
    className: string,
    key: string,
    iconName?: EvaIconName,
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>,
    children?: ReactNode,
    onContextMenu?: React.MouseEventHandler<HTMLOrSVGElement>,
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>,
  ) => {
    return (
      <div
        className={`keyboard-flash-key ${className} ${keyInFix === key ? 'key-in-fix' : ''}`}
        onMouseUp={onMouseUp || (() => currentInput.write(key))}
        onMouseDown={event => {
          event.stopPropagation();
          setKeyInFix(key);
        }}
        onMouseOver={() => keyInFix && setKeyInFix(key)}
        onTouchStart={event => {
          event.stopPropagation();
          setKeyInFix(key);
          onTouchStart?.(event);
        }}
        {...propsOfClicker({ onCtxMenu: onContextMenu })}
      >
        {children}
        {iconName ? (
          <EvaIcon
            name={iconName}
            className="key-button"
          />
        ) : (
          <div>{key}</div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`keyboard-flash ${currentInput?.isFocused ? 'active' : ''} ${moreClosed ? '' : 'more-open'}`}
      onMouseDown={event => {
        event.stopPropagation();
        setKeyInFix('CLOSE-MORE');
      }}
      onTouchEnd={event => {
        event.stopPropagation();
        setKeyInFix(null);
        currentInput.onTouchNavigationEnd(event);
      }}
      onTouchMove={event => {
        currentInput.onTouchNavigationMove(event, event.targetTouches[0].clientX);
      }}
      onMouseUp={event => {
        event.stopPropagation();
        setKeyInFix(null);
        !moreClosed && setMoreClosed(true);
      }}
    >
      {currentInput ? (
        currentInput.type === 'number' ? (
          <>
            {keyboardNumberScreenLines.map((line, linei) => {
              return (
                <div
                  key={linei}
                  className="keyboard-flash-line number-type"
                >
                  {line.map((key, keyi) => {
                    return <React.Fragment key={keyi}>{keyNode('writable', key)}</React.Fragment>;
                  })}
                </div>
              );
            })}
            <div className="keyboard-flash-line bottom-line">
              {keyNode(
                currentInput.canUndo() ? 'full-width' : 'full-width disabled',
                'UNDO',
                'corner-up-left-outline',
                () => currentInput.undo(),
              )}
              {keyNode(
                currentInput.canRedo() ? 'full-width' : 'full-width disabled',
                'REDO',
                'corner-up-right-outline',
                () => currentInput.redo(),
              )}
              {keyNode('writable self-width', '0')}
              {keyNode('backspace full-width', 'BACKSPACE', 'backspace-outline', event =>
                currentInput.backspace(event),
              )}
              {keyNode('full-width', 'BLUR', 'arrowhead-down-outline', () => currentInput.blur())}
            </div>
          </>
        ) : (
          <>
            {keyboardKeyDict[currentInput.currentLanguage][currentInput.event.shiftKey ? 'upper' : 'lower'].map(
              (line, linei) => {
                return (
                  <div
                    key={linei}
                    className="keyboard-flash-line"
                  >
                    {linei === 3
                      ? keyNode(
                          `shift-key ${currentInput.isCapsLock ? 'caps-lock' : ''} ${
                            currentInput.event.ctrlKey ? 'is-control-key-label' : ''
                          }`,
                          'SHIFT',
                          'arrow-upward-outline',
                          () => currentInput.switchCaps(),
                          null,
                          event => {
                            event.preventDefault();
                            currentInput.switchCtrlKey();
                          },
                          event => currentInput.onTouchNavigationStart('select', event.targetTouches[0].clientX),
                        )
                      : null}
                    {line.map((key, keyi) => {
                      return <React.Fragment key={keyi}>{keyNode('writable', key)}</React.Fragment>;
                    })}
                    {linei === 3
                      ? keyNode(
                          'backspace',
                          'BACKSPACE',
                          'backspace-outline',
                          event => currentInput.backspace(event),
                          null,
                          undefined,
                          event => currentInput.onTouchNavigationStart('delete', event.targetTouches[0].clientX),
                        )
                      : null}
                  </div>
                );
              },
            )}

            <div className="keyboard-flash-line bottom-line">
              {keyNode(
                currentInput.canUndo() ? 'undo-action' : 'undo-action disabled',
                'UNDO',
                'corner-up-left-outline',
                event => {
                  event.stopPropagation();
                  setKeyInFix(null);
                  currentInput.undo();
                },
              )}
              {keyNode(
                'more-box',
                'CLOSE-MORE',
                moreClosed ? 'bulb-outline' : 'close-outline',
                () => setMoreClosed(!moreClosed),
                moreClosed ? null : (
                  <div
                    className="keyboard-flash-key-more-box-list no-scrollbar"
                    ref={elem => elem && keyInFix === null && (elem.scrollTop = window.innerHeight)}
                  >
                    <div className="keyboard-flash-key-more-box-inner">
                      {keyNode(
                        '',
                        'WORD-SELECT-MODE',
                        currentInput.event.ctrlKey ? 'flash-off-outline' : 'flash-outline',
                        () => currentInput.switchCtrlKey(),
                        <span className="key-description">Ctrl клавиша</span>,
                      )}
                      {currentInput.nullOrCanSelectAll() &&
                        keyNode(
                          '',
                          'SELECT_ALL',
                          'text-outline',
                          () => currentInput.selectAll(),
                          <span className="key-description">Выделить всё</span>,
                        )}
                      {currentInput.nullOrCanCopy() &&
                        keyNode(
                          '',
                          'COPY',
                          'copy-outline',
                          () => currentInput.copy(),
                          <span className="key-description">Копировать</span>,
                        )}
                      {currentInput.nullOrCanPaste() &&
                        keyNode(
                          '',
                          'PASTE',
                          'clipboard-outline',
                          () => currentInput.paste(),
                          <span className="key-description">Вставить</span>,
                        )}
                      {keyNode(
                        currentInput.canRedo() ? '' : ' disabled',
                        'REDO',
                        'corner-up-right-outline',
                        event => {
                          event.stopPropagation();
                          setKeyInFix(null);
                          currentInput.redo();
                        },
                        <span className="key-description">Вернуть</span>,
                      )}
                    </div>
                  </div>
                ),
              )}
              {keyNode('space-key', ' ', undefined, undefined, null, undefined, event =>
                currentInput.onTouchNavigationStart('navigate', event.targetTouches[0].clientX),
              )}
              {keyNode('', 'LANG', 'globe-outline', () => currentInput.switchLanguage(), null)}
              {currentInput.isMultiline
                ? keyNode('enter', '\n', 'corner-down-left-outline')
                : keyNode('', 'BLUR', 'arrowhead-down-outline', () => currentInput.blur())}
            </div>
          </>
        )
      ) : null}
    </div>
  );
});
