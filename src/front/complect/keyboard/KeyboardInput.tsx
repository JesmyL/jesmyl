import React, { ReactNode, memo, useEffect, useMemo, useRef, useState } from 'react';
import { IconArrowDown01StrokeRounded } from '../../complect/the-icon/icons/arrow-down-01';
import { IconArrowTurnBackwardStrokeRounded } from '../../complect/the-icon/icons/arrow-turn-backward';
import { IconArrowUp03StrokeRounded } from '../../complect/the-icon/icons/arrow-up-03';
import { IconCancel01StrokeRounded } from '../../complect/the-icon/icons/cancel-01';
import { IconCancel02StrokeRounded } from '../../complect/the-icon/icons/cancel-02';
import { IconCopy01StrokeRounded } from '../../complect/the-icon/icons/copy-01';
import { IconEraser01StrokeRounded } from '../../complect/the-icon/icons/eraser-01';
import { IconFlashStrokeRounded } from '../../complect/the-icon/icons/flash';
import { IconFlashOffStrokeRounded } from '../../complect/the-icon/icons/flash-off';
import { IconIdea01StrokeRounded } from '../../complect/the-icon/icons/idea-01';
import { IconLanguageSkillStrokeRounded } from '../../complect/the-icon/icons/language-skill';
import { IconLinkBackwardStrokeRounded } from '../../complect/the-icon/icons/link-backward';
import { IconLinkForwardStrokeRounded } from '../../complect/the-icon/icons/link-forward';
import { IconTask01StrokeRounded } from '../../complect/the-icon/icons/task-01';
import { IconTextStrokeRounded } from '../../complect/the-icon/icons/text';
import { IconViewStrokeRounded } from '../../complect/the-icon/icons/view';
import { IconViewOffStrokeRounded } from '../../complect/the-icon/icons/view-off';
import { indexSimpleValIsUseNativeKeyboard } from '../../components/index/complect/index.simpleValues';
import propsOfClicker from '../clicker/propsOfClicker';
import { TheIconType } from '../the-icon/model';
import { keyboardKeyDict, keyboardNumberScreenLines } from './Keyboard.complect';
import { KeyboardInputProps } from './Keyboard.model';
import './Keyboard.scss';
import { KeyboardInputStorage } from './KeyboardStorage';

let currentInput: KeyboardInputStorage;
let topForceUpdate: () => void = () => {};
let topOnBlur: () => void = () => {};
let topOnFocus: (currentInput: KeyboardInputStorage | nil) => void = () => {};

const stopCb = (event: EventStopper) => event.stopPropagation();

export default function KeyboardInput(props: KeyboardInputProps) {
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
      else if (value.match(/\D/)) setValue((newVal = '0'));
    } else if (value === '0' && props.value !== '0') setValue((newVal = ''));

    if (newVal !== undefined) props.onChange?.(newVal, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  useEffect(() => {
    !indexSimpleValIsUseNativeKeyboard.get() && value && input.replaceAll(value, false, true);
  }, [value, input]);

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
          try {
            invoke(onPaste, await navigator.clipboard.readText());
          } catch (error) {}
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

    const EyeIcon = isHiddenPassword ? IconViewStrokeRounded : IconViewOffStrokeRounded;

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
              <EyeIcon onMouseDown={() => setIsHiddenPassword(is => !is)} />
            ) : (
              !withoutCloseButton &&
              (type !== 'number' || isForceZero || value !== '0') && (
                <IconCancel01StrokeRounded
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

  if (indexSimpleValIsUseNativeKeyboard.get()) return null;

  const keyNode = (
    className: string,
    key: string,
    Icon?: TheIconType,
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>,
    children?: ReactNode,
    onContextMenu?: React.MouseEventHandler<HTMLOrSVGElement>,
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>,
  ) => {
    return (
      <div
        className={`keyboard-flash-key pointer ${className} ${keyInFix === key ? 'key-in-fix' : ''}`}
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
        {Icon ? <Icon className="key-button" /> : <div>{key}</div>}
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
                IconLinkBackwardStrokeRounded,
                () => currentInput.undo(),
              )}
              {keyNode(
                currentInput.canRedo() ? 'full-width' : 'full-width disabled',
                'REDO',
                IconLinkForwardStrokeRounded,
                () => currentInput.redo(),
              )}
              {keyNode('writable self-width', '0')}
              {keyNode('backspace full-width', 'BACKSPACE', IconEraser01StrokeRounded, event =>
                currentInput.backspace(event),
              )}
              {keyNode('full-width', 'BLUR', IconArrowDown01StrokeRounded, () => currentInput.blur())}
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
                          IconArrowUp03StrokeRounded,
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
                          IconEraser01StrokeRounded,
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
                IconLinkBackwardStrokeRounded,
                event => {
                  event.stopPropagation();
                  setKeyInFix(null);
                  currentInput.undo();
                },
              )}
              {keyNode(
                'more-box',
                'CLOSE-MORE',
                moreClosed ? IconIdea01StrokeRounded : IconCancel02StrokeRounded,
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
                        currentInput.event.ctrlKey ? IconFlashOffStrokeRounded : IconFlashStrokeRounded,
                        () => currentInput.switchCtrlKey(),
                        <span className="key-description">Ctrl клавиша</span>,
                      )}
                      {currentInput.nullOrCanSelectAll() &&
                        keyNode(
                          '',
                          'SELECT_ALL',
                          IconTextStrokeRounded,
                          () => currentInput.selectAll(),
                          <span className="key-description">Выделить всё</span>,
                        )}
                      {currentInput.nullOrCanCopy() &&
                        keyNode(
                          '',
                          'COPY',
                          IconCopy01StrokeRounded,
                          () => currentInput.copy(),
                          <span className="key-description">Копировать</span>,
                        )}
                      {currentInput.nullOrCanPaste() &&
                        keyNode(
                          '',
                          'PASTE',
                          IconTask01StrokeRounded,
                          () => currentInput.paste(),
                          <span className="key-description">Вставить</span>,
                        )}
                      {keyNode(
                        currentInput.canRedo() ? '' : ' disabled',
                        'REDO',
                        IconLinkForwardStrokeRounded,
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
              {keyNode('', 'LANG', IconLanguageSkillStrokeRounded, () => currentInput.switchLanguage(), null)}
              {currentInput.isMultiline
                ? keyNode('enter', '\n', IconArrowTurnBackwardStrokeRounded)
                : keyNode('', 'BLUR', IconArrowDown01StrokeRounded, () => currentInput.blur())}
            </div>
          </>
        )
      ) : null}
    </div>
  );
});
