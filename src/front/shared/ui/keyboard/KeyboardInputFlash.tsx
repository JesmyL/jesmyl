import { propsOfClicker } from '#shared/lib/clicker/propsOfClicker';
import { indexIsUseNativeKeyboardAtom } from '$index/complect/index.atoms';
import React, { memo, ReactNode, useEffect, useState } from 'react';
import { StameskaIconName } from 'stameska-icon';
import { LazyIcon } from '../the-icon/LazyIcon';
import { keyboardKeyDict, keyboardNumberScreenLines } from './Keyboard.complect';
import './Keyboard.scss';
import { KeyboardInputStorage } from './KeyboardStorage';
import { keyboardInputGlobals } from './lib';

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
  keyboardInputGlobals.topForceUpdate = () => setUpdates(updates + 1);
  keyboardInputGlobals.topOnBlur = () => onBlur();
  keyboardInputGlobals.topOnFocus = () => onFocus(keyboardInputGlobals.currentInput);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
      keyboardInputGlobals.currentInput?.onOverflowMouseDown();
    };
    const onMouseUp = () => {
      keyboardInputGlobals.currentInput?.onOverflowMouseUp();
      setKeyInFix(null);
    };
    const onKeyDown = (event: KeyboardEvent) => keyboardInputGlobals.currentInput?.onOverflowKeyDown(event);
    const onKeyUp = () => keyboardInputGlobals.currentInput?.onOverflowKeyUp();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      keyboardInputGlobals.currentInput?.blur();
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  if (indexIsUseNativeKeyboardAtom.get()) return null;

  const keyNode = (
    className: string,
    key: string,
    icon?: StameskaIconName,
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>,
    children?: ReactNode,
    onContextMenu?: React.MouseEventHandler<HTMLOrSVGElement>,
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>,
  ) => {
    return (
      <div
        className={`keyboard-flash-key pointer ${className} ${keyInFix === key ? 'key-in-fix' : ''}`}
        onMouseUp={onMouseUp || (() => keyboardInputGlobals.currentInput.write(key))}
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
        {...propsOfClicker({ onCtxMenu: onContextMenu as never })}
      >
        {children}
        {icon ? (
          <LazyIcon
            icon={icon}
            className="key-button"
          />
        ) : (
          <div>{key}</div>
        )}
      </div>
    );
  };

  const currentInput = keyboardInputGlobals.currentInput;

  return (
    <div
      className={`keyboard-flash ${keyboardInputGlobals.currentInput?.isFocused ? 'active' : ''} ${
        moreClosed ? '' : 'more-open'
      }`}
      onMouseDown={event => {
        event.stopPropagation();
        setKeyInFix('CLOSE-MORE');
      }}
      onTouchEnd={event => {
        event.stopPropagation();
        setKeyInFix(null);
        keyboardInputGlobals.currentInput.onTouchNavigationEnd(event);
      }}
      onTouchMove={event => {
        keyboardInputGlobals.currentInput.onTouchNavigationMove(event, event.targetTouches[0].clientX);
      }}
      onMouseUp={event => {
        event.stopPropagation();
        setKeyInFix(null);
        if (!moreClosed) setMoreClosed(true);
      }}
    >
      {keyboardInputGlobals.currentInput ? (
        keyboardInputGlobals.currentInput.type === 'number' ? (
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
                keyboardInputGlobals.currentInput.canUndo() ? 'full-width' : 'full-width disabled',
                'UNDO',
                'LinkBackward',
                () => currentInput.undo(),
              )}
              {keyNode(currentInput.canRedo() ? 'full-width' : 'full-width disabled', 'REDO', 'LinkForward', () =>
                currentInput.redo(),
              )}
              {keyNode('writable self-width', '0')}
              {keyNode('backspace full-width', 'BACKSPACE', 'Eraser01', event => currentInput.backspace(event))}
              {keyNode('full-width', 'BLUR', 'ArrowDown01', () => currentInput.blur())}
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
                          'ArrowUp03',
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
                          'Eraser01',
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
                'LinkBackward',
                event => {
                  event.stopPropagation();
                  setKeyInFix(null);
                  currentInput.undo();
                },
              )}
              {keyNode(
                'more-box',
                'CLOSE-MORE',
                moreClosed ? 'Idea01' : 'Cancel02',
                () => setMoreClosed(!moreClosed),
                moreClosed ? null : (
                  <div
                    className="keyboard-flash-key-more-box-list no-scrollbar"
                    ref={elem => {
                      if (elem && keyInFix === null) elem.scrollTop = window.innerHeight;
                    }}
                  >
                    <div className="keyboard-flash-key-more-box-inner">
                      {keyNode(
                        '',
                        'WORD-SELECT-MODE',
                        currentInput.event.ctrlKey ? 'FlashOff' : 'Flash',
                        () => currentInput.switchCtrlKey(),
                        <span className="key-description">Ctrl клавиша</span>,
                      )}
                      {currentInput.nullOrCanSelectAll() &&
                        keyNode(
                          '',
                          'SELECT_ALL',
                          'Text',
                          () => currentInput.selectAll(),
                          <span className="key-description">Выделить всё</span>,
                        )}
                      {currentInput.nullOrCanCopy() &&
                        keyNode(
                          '',
                          'COPY',
                          'Copy01',
                          () => currentInput.copy(),
                          <span className="key-description">Копировать</span>,
                        )}
                      {currentInput.nullOrCanPaste() &&
                        keyNode(
                          '',
                          'PASTE',
                          'Task01',
                          () => currentInput.paste(),
                          <span className="key-description">Вставить</span>,
                        )}
                      {keyNode(
                        currentInput.canRedo() ? '' : ' disabled',
                        'REDO',
                        'LinkForward',
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
              {keyNode('', 'LANG', 'LanguageSkill', () => currentInput.switchLanguage(), null)}
              {currentInput.isMultiline
                ? keyNode('enter', '\n', 'ArrowTurnBackward')
                : keyNode('', 'BLUR', 'ArrowDown01', () => currentInput.blur())}
            </div>
          </>
        )
      ) : null}
    </div>
  );
});
