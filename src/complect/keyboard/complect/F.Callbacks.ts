import { KeyboardInputPropsType, KeyboardStorageEvent } from '../Keyboard.model';
import { KeyboardStorageChanges } from './E.Changes';


export class KeyboardStorageCallbacks extends KeyboardStorageChanges {
    type?: KeyboardInputPropsType;
    isHiddenPassword?: boolean;
    isContextOpen = false;

    charListElementRef = (element: HTMLDivElement) => element && (this.flowCharListElement = element);

    onStopPropagation = (event: KeyboardStorageEvent) => event.stopPropagation();

    onFlashMouseDown = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isContextOpen = false;
        this.focus();
    }

    onSelectAllButton = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isContextOpen = false;
        this.selectAll();
    }

    onCopyButton = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isContextOpen = false;
        this.copy();
    }

    onPasteButton = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isContextOpen = false;
        this.paste();
    }

    onPasteBeforeButton = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isContextOpen = false;
        this.paste('before');
    }

    onClearButton = () => {
        this.replaceAll("");
        this.isContextOpen = false;
        this.focus();
    }

    onPasswordEyeButton = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isHiddenPassword = !this.isHiddenPassword;
        this.forceUpdate();
    }

    onFlashContextMenu = (event: KeyboardStorageEvent) => {
        event.stopPropagation();
        event.preventDefault();
        this.isContextOpen = true;
        this.forceUpdate();
    }

    onCharMouseDown = (chari: number, event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.downTs = Date.now();
        this.isSelecting = true;
        this.isContextOpen = false;

        this.selectIfShift(event, () => {
            if (!this.isShiftKey(event)) this.selected[0] = chari;
        }, false);

        this.focus();
    }

    onCharContextMenu = (chari: number, event: KeyboardStorageEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.isContextOpen = false;
        this.selectWord(chari);
    }

    onCharDoubleClick = (chari: number, event: KeyboardStorageEvent) => {
        event.preventDefault();
        this.isContextOpen = false;
        this.selectWord(chari);
    }

    onCharMouseOver = (chari: number, event: KeyboardStorageEvent) => {
        event.stopPropagation();
        if (this.isSelecting) {
            this.isSelected = true;

            this.selected[1] =
                this.setCursorPosition(this.isCtrlKey(event)
                    ? this.selected[0] > chari
                        ? this.findWordStart(chari)
                        : this.findWordFinish(chari)
                    : chari);

            this.forceUpdate();
        }
    }

    onCharMouseUp = (chari: number, event: KeyboardStorageEvent) => {
        event.stopPropagation();
        this.isSelecting = false;

        if (Date.now() - this.downTs < 300) {
            this.selectIfShift(event, () => {
                if (!this.isShiftKey(event)) this.isSelected = false;
                this.setCursorPosition(this.isCtrlKey(event)
                    ? this.selected[0] > chari
                        ? this.findWordStart(chari)
                        : this.findWordFinish(chari)
                    : chari);
            });
        } else {
            this.selected[1] = chari;
            this.forceUpdate();
        }
    }

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

    onOverflowKeyDown(event: KeyboardEvent) {
        if (!this.isFocused) return;
        switch (event.key) {
            case 'Backspace':
                this.backspace(event);
                return;
            case 'Delete':
                this.delete(event);
                return;
            case 'Enter':
                this.isMultiline && this.write('\n');
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