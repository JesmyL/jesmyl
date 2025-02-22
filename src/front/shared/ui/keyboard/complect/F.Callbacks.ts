import { KeyboardStorageEvent, TouchSelectionMode } from '../Keyboard.model';
import { KeyboardStorageChanges } from './E.Changes';

export class KeyboardStorageCallbacks extends KeyboardStorageChanges {
  isHiddenPassword?: boolean;
  isContextOpen = false;
  touchNavigationMode?: TouchSelectionMode;
  touchNavigationXStart: number | null = null;
  touchNavigationXPosition: number | null = null;

  charListElementRef = (element: HTMLDivElement) => element && (this.flowCharListElement = element);

  onStopPropagation = (event: KeyboardStorageEvent) => event.stopPropagation();

  onFlashMouseDown = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isContextOpen = false;
    this.focus();
  };

  onSelectAllButton = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isContextOpen = false;
    this.selectAll();
  };

  onCopyButton = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isContextOpen = false;
    this.copy();
  };

  onPasteButton = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isContextOpen = false;
    this.paste();
  };

  onPasteBeforeButton = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isContextOpen = false;
    this.paste('before');
  };

  onClearButton = () => {
    this.replaceAll('');
    this.isContextOpen = false;
    this.focus();
  };

  onPasswordEyeButton = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isHiddenPassword = !this.isHiddenPassword;
    this.forceUpdate();
  };

  onFlashContextMenu = (event: KeyboardStorageEvent) => {
    event.stopPropagation();
    event.preventDefault();
    this.isContextOpen = true;
    this.forceUpdate();
  };

  onCharContextMenu = (chari: number, event: KeyboardStorageEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.isContextOpen = false;
    this.selectWord(chari);
  };

  onCharDoubleClick = (chari: number, event: KeyboardStorageEvent) => {
    event.preventDefault();
    this.isContextOpen = false;
    this.selectWord(chari);
  };

  onCharMouseDown = (chari: number, event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.downTs = Date.now();
    this.isSelecting = true;
    this.isContextOpen = false;

    this.selectIfShift(
      event,
      () => {
        if (!this.isShiftKey(event)) this.selected[0] = chari;
      },
      false,
    );

    this.focus();
  };

  onCharMouseOver = (chari: number, event: KeyboardStorageEvent) => {
    event.stopPropagation();
    if (this.isSelecting) {
      this.isSelected = true;

      this.selected[1] = this.setCursorPosition(
        this.isCtrlKey(event)
          ? this.selected[0] > chari
            ? this.findWordStart(chari)
            : this.findWordFinish(chari)
          : chari,
      );

      this.forceUpdate();
    }
  };

  onCharMouseUp = (chari: number, event: KeyboardStorageEvent) => {
    event.stopPropagation();
    this.isSelecting = false;

    if (Date.now() - this.downTs < 300) {
      this.selectIfShift(event, () => {
        if (!this.isShiftKey(event)) this.isSelected = false;
        this.setCursorPosition(
          this.isCtrlKey(event)
            ? (this.isSelected ? this.selected[0] : this.cursorPosition) > chari
              ? this.findWordStart(chari)
              : this.findWordFinish(chari)
            : chari,
        );
      });
    } else {
      this.selected[1] = chari;
      this.forceUpdate();
    }
  };

  onTouchNavigationStart = (mode: TouchSelectionMode, xStart: number) => {
    this.touchNavigationMode = mode;
    this.touchNavigationXPosition = 0;
    this.touchNavigationXStart = xStart;
    this.shadowCursorPosition = this.cursorPosition;
    if (!this.isSelected) this.selected[0] = this.cursorPosition;
    this.forceUpdate();
  };

  onTouchNavigationMove = (event: KeyboardStorageEvent, xPosition: number) => {
    if (
      !this.touchNavigationMode ||
      (this.touchNavigationMode !== 'navigate' &&
        (this.touchNavigationMode === 'delete'
          ? xPosition > (this.touchNavigationXStart as number)
          : xPosition < (this.touchNavigationXStart as number)))
    )
      return;
    this.touchNavigationXPosition = xPosition;
    const newPosition =
      this.shadowCursorPosition - Math.floor(((this.touchNavigationXStart as number) - xPosition) / 7);
    const limitedPosition = newPosition > this.value.length ? this.value.length : newPosition < 0 ? 0 : newPosition;

    if (this.touchNavigationMode === 'navigate') {
      this.selectIfShift(event, () => {
        this.setCursorPosition(limitedPosition);
      });
    } else {
      this.isSelected = newPosition !== this.shadowCursorPosition;

      this.selected[1] = limitedPosition;
    }
    this.scrollToView();
    this.forceUpdate();
  };

  onTouchNavigationEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (this.touchNavigationXPosition && this.touchNavigationMode === 'delete') {
      this.backspace(event);
      this.isSelected = false;
    }
    delete this.touchNavigationMode;
    this.touchNavigationXStart = null;
    this.touchNavigationXPosition = null;
    this.forceUpdate();
  };

  onOverflowMouseDown() {
    if (!this.isFocused) return;
    this.blur();
  }

  onOverflowMouseUp() {
    if (!this.isFocused) return;
    const isClick = Date.now() - this.downTs < 300;

    if (isClick) this.blur();
    else {
      this.isSelecting = false;
      this.downTs = 0;
      this.forceUpdate();
    }
  }

  onOverflowKeyUp() {
    if (!this.isFocused) return;
    this.isOverflowKeyDown = false;
    this.forceUpdate();
  }

  onOverflowKeyDown(event: KeyboardEvent) {
    if (!this.isFocused) return;
    this.isOverflowKeyDown = true;
    switch (event.key) {
      case 'Backspace':
        this.backspace(event);
        return;
      case 'Delete':
        this.delete(event);
        return;
      case 'Enter':
        if (this.isMultiline) this.write('\n');
        return;
      case 'ArrowLeft':
        this.arrowLeft(event);
        return;
      case 'ArrowRight':
        this.arrowRight(event);
        return;
    }

    if (event.ctrlKey) {
      switch (event.code) {
        case 'KeyA':
          this.selectAll();
          break;
        case 'KeyZ':
          if (event.shiftKey) this.redo();
          else this.undo();
          break;
        case 'KeyY':
          this.redo();
          break;
        case 'KeyV':
          this.paste();
          break;
        case 'KeyC':
          this.copy();
          break;
        case 'KeyX':
          this.cut();
          break;
      }

      return;
    }

    switch (event.key) {
      case 'Escape':
        if (this.isSelected) {
          this.selected = [-1, -1];
          this.isSelected = false;
          this.isSelecting = false;
          this.forceUpdate();
        }
        break;
      case 'ArrowUp':
        this.arrowUp(event);
        break;
      case 'ArrowDown':
        this.arrowDown(event);
        break;
      default:
        if (event.key.length === 1) {
          event.preventDefault();
          if (this.type === 'number' && /\D/.exec(event.key)) return;
          this.write(event.key);
        }
    }
  }
}
