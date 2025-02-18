import { KeyboardStorageEvent } from '../Keyboard.model';
import { KeyboardStorageHistoty } from './C.History';

export class KeyboardStorageNavigate extends KeyboardStorageHistoty {
  downTs = 0;
  flowCharListElement: HTMLDivElement | nil;
  focusedLinei: number = -1;
  focusedOffset: number = 0;
  offsetElements: HTMLSpanElement[] = [];

  arrowLeft(event: KeyboardStorageEvent) {
    event.preventDefault();
    this.selectIfShift(event, () => {
      if (!this.isShiftKey(event) && this.isSelected && (this.selected[0] === 0 || this.selected[1] === 0)) {
        this.setCursorPosition(0);
        this.isSelected = false;
        this.forceUpdate();
      } else if (this.cursorPosition) {
        if (this.isCtrlKey(event)) {
          this.setCursorPosition(this.findWordStart(this.cursorPosition, true) + (this.isSelecting ? 1 : 0));
        } else this.setCursorPosition(this.cursorPosition - 1);
      }
    });

    this.scrollToView();
  }

  arrowRight(event: KeyboardStorageEvent) {
    event.preventDefault();

    this.selectIfShift(event, () => {
      if (
        !this.isShiftKey(event) &&
        this.isSelected &&
        (this.selected[0] === this.valueChars.length || this.selected[1] === this.valueChars.length)
      ) {
        this.setCursorPosition(this.valueChars.length);
        this.isSelected = false;
        this.forceUpdate();
      } else if (this.cursorPosition < this.valueChars.length) {
        if (this.isCtrlKey(event)) this.setCursorPosition(this.findWordFinish(this.cursorPosition));
        else this.setCursorPosition(this.cursorPosition + 1);
      }
    });

    this.scrollToView();
  }

  arrowUp(event: KeyboardStorageEvent) {
    event.preventDefault();
    this.selectIfShift(event, () => this.onArrowUpward());
    this.scrollToView();
  }

  arrowDown(event: KeyboardStorageEvent) {
    event.preventDefault();
    this.selectIfShift(event, () => this.onArrowDownward());
    this.scrollToView();
  }

  onArrowUpward() {
    let isZeroFind = false;

    const revIndex = this.offsetElements
      .slice(0, this.cursorPosition - this.focusedLinei - 1)
      .reverse()
      .findIndex((element, elementi) => {
        if (element.offsetLeft === 0) {
          if (!elementi) return false;
          isZeroFind = true;
          return false;
        }
        if (
          (isZeroFind && this.focusedOffset > element.offsetLeft + element.clientWidth) ||
          (this.focusedOffset > element.offsetLeft && this.focusedOffset <= element.offsetLeft + element.clientWidth)
        ) {
          return true;
        }

        return false;
      });

    if (revIndex < 0) this.setCursorPosition(0);
    else this.setCursorPosition(this.cursorPosition - (revIndex + 2), false);
  }

  onArrowDownward() {
    let isZeroFind = 0;
    let prev: number;
    let isNeedMinus = false;

    const index = this.offsetElements.slice(this.cursorPosition).findIndex((element, elementi) => {
      if (this.focusedOffset === element.offsetLeft) return false;
      if (element.offsetLeft === 0) {
        if (!elementi) return false;
        if (isZeroFind && this.focusedOffset > prev) {
          isNeedMinus = true;
          return true;
        }
        isZeroFind++;
        return false;
      }

      if (this.focusedOffset >= element.offsetLeft && this.focusedOffset <= element.offsetLeft + element.clientWidth) {
        return true;
      }

      prev = element.offsetLeft + element.clientWidth;
      return false;
    });

    if (index < 0) this.setCursorPosition(this.valueChars.length);
    else this.setCursorPosition(this.cursorPosition + index + this.focusedLinei + (isNeedMinus ? 0 : 1), false);
  }

  isZeroCursorOn(charLinei: number) {
    return (!this.isSelected && this.cursorPosition === 0 && charLinei === 0) || this.cursorPosition === charLinei;
  }

  isCursorOn(chari: number) {
    return !this.isSelected && this.cursorPosition - 1 === chari;
  }
}
