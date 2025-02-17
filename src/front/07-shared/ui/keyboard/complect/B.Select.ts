import { ReactNode } from 'react';
import { KeyboardStorageEvent } from '../Keyboard.model';
import { KeyboardStorageBase } from './A.Base';

export class KeyboardStorageSelect extends KeyboardStorageBase {
  _cursorPosition = 0;
  isSelecting = false;
  selected: [number, number] = [-1, -1];
  isCapsLock: boolean = false;
  event: { shiftKey: boolean; ctrlKey: boolean } = {} as never;
  isCursorPositionChanged = false;
  valueChars: string[] = [];
  valueCharLines: ReactNode[][] = [];

  get cursorPosition() {
    return this._cursorPosition;
  }

  setCursorPosition(value: number, isFixChange = true) {
    if (isFixChange) this.isCursorPositionChanged = true;
    this._cursorPosition = value;
    return value;
  }

  isCtrlKey(event: KeyboardStorageEvent) {
    return event.ctrlKey || this.event.ctrlKey;
  }

  isShiftKey(event: KeyboardStorageEvent) {
    return event.shiftKey || this.event.shiftKey;
  }

  switchCtrlKey() {
    this.event.ctrlKey = !this.event.ctrlKey;
    this.forceUpdate();
  }

  switchCaps() {
    if (this.isCapsLock) {
      this.event.shiftKey = false;
      this.isCapsLock = false;
    } else if (this.event.shiftKey) this.isCapsLock = true;
    else this.event.shiftKey = true;

    this.forceUpdate();
  }

  isSelectedChar(chari: number) {
    return (
      this.isSelected &&
      ((this.selected[0] <= chari && this.selected[1] > chari) ||
        (this.selected[0] > chari && this.selected[1] <= chari))
    );
  }

  selectIfShift(event: KeyboardStorageEvent, cb: () => void, isNeedForceUpdate = true) {
    if (event.shiftKey || this.event.shiftKey) {
      if (!this.isSelected) this.selected[0] = this.cursorPosition;
      cb();

      if (this.selected[0] === this.cursorPosition) this.isSelected = false;
      else {
        this.selected[1] = this.cursorPosition;
        this.isSelected = true;
      }
    } else {
      cb();
      this.isSelected = false;
    }

    if (isNeedForceUpdate) this.forceUpdate();
  }

  selectAll() {
    if (!this.value) return;
    this.selected = [0, this.valueChars.length];
    this.isSelected = true;
    this.forceUpdate();
  }

  selectWord(chari: number) {
    this.selected = [this.findWordStart(chari), this.findWordFinish(chari)];
    this.isSelected = true;
    this.forceUpdate();
  }

  findWordStart(chari: number, isSpaceInWord = false): number {
    return (
      this.valueChars.reduceRight(
        (acc, curr, curri): number | null =>
          acc != null
            ? acc
            : (curr === ' ' || curr === '\n') && curri < chari
              ? curri + (isSpaceInWord ? 0 : curri + 1 === chari ? 0 : 1)
              : null,
        null as null | number,
      ) || 0
    );
  }

  findWordFinish(chari: number): number {
    return (
      this.valueChars.reduce(
        (acc, curr, curri): number | null =>
          acc != null ? acc : (curr === ' ' || curr === '\n') && curri > chari ? curri : null,
        null as null | number,
      ) || this.valueChars.length
    );
  }
}
