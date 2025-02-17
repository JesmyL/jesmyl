import { ReactNode } from 'react';
import { makeRegExp } from 'shared/utils';
import { KeyboardInputPropsType, KeyboardStorageEvent } from '../Keyboard.model';
import { KeyboardStorageNavigate } from './D.Navigate';

export class KeyboardStorageChanges extends KeyboardStorageNavigate {
  type?: KeyboardInputPropsType;
  prevTypedValue: string = '';
  shadowCursorPosition = this.cursorPosition;
  dafaultSetIsUnknownSymbols = () => false;
  dafaultMapChar = (char: string) => char;
  setIsUnknownSymbols: (char: string) => boolean = this.dafaultSetIsUnknownSymbols;
  mapChar: (char: string) => ReactNode = this.dafaultMapChar;
  maxLength?: number;
  isDisabled?: boolean;

  replaceAll = (value: string, isRemember = true, isInvokeOnInputEvent = false) => {
    if (this.isDisabled || value === this.value) return;
    let val = value;
    if (this.maxLength !== undefined && val.length > this.maxLength) {
      val = value.slice(0, this.maxLength);
    }
    const prev = this.value;
    if (isRemember) this.remember('replaceAll');
    this.valueChars = val?.split('') || [];
    this.setCursorPosition(this.valueChars.length);
    this.scrollToView();
    this.setValues();
    if (isInvokeOnInputEvent) this.onInput?.(this.value, prev);
  };

  protected setValues() {
    if (this.isDisabled) return;
    let lastLine: ReactNode[] = [];
    const lines: ReactNode[][] = [lastLine];

    this.valueChars.forEach(char => {
      if (char === '\n') {
        if (this.isMultiline) {
          lastLine = [];
          lines.push(lastLine);
        } else lastLine.push('*');

        return;
      }
      lastLine.push(this.setIsUnknownSymbols(char) ? '�' : this.mapChar(char));
    });

    this.valueCharLines = lines;
    const prev = this.value;
    this.value = this.valueChars.join('');

    this.textUpdate(prev);
  }

  protected replaceSelected(val?: string): boolean {
    if (this.isDisabled || !this.isSelected) return false;

    const start = Math.min.apply(null, this.selected);
    const finish = Math.max.apply(null, this.selected);

    this.remember('replaceSelected');

    if (start === finish) return false;

    const deltaPosition = this.insertValueChars(this.maxLimitedValue(val, finish - start), start, finish - start);
    this.setCursorPosition(start + deltaPosition);

    this.isSelected = false;
    this.scrollToView();
    this.setValues();

    return true;
  }

  private maxLimitedValue(value?: string, selectedChars?: number) {
    if (this.isDisabled) return;
    if (value !== undefined && this.maxLength !== undefined) {
      const sliceFinish = this.maxLength - (this.value.length - (selectedChars === undefined ? 0 : selectedChars));
      if (sliceFinish > -1) return value.slice(0, sliceFinish);
      else return '';
    }

    return value;
  }

  private insertValueChars(value: string | undefined, point: number, count: number) {
    if (this.isDisabled) return 0;
    if (value === undefined || value.length === 0) {
      this.valueChars.splice(point, count);
      return 0;
    } else {
      if (value.length > 1) this.valueChars.splice(point, count, ...value.split(''));
      else this.valueChars.splice(point, count, value);

      return value.length;
    }
  }

  backspace(event: KeyboardStorageEvent) {
    if (this.isDisabled) return;
    if (this.replaceSelected()) return;
    this.remember('backspace');
    if (this.cursorPosition > 0) {
      if (this.isCtrlKey(event)) {
        const start = this.findWordStart(this.cursorPosition);
        this.valueChars.splice(start, this.cursorPosition - start);
        this.setCursorPosition(start);
      } else {
        this.valueChars.splice(this.cursorPosition - 1, 1);
        this.setCursorPosition(this.cursorPosition - 1);
      }
      this.isSelected = false;

      this.scrollToView();
      const prev = this.value;
      this.setValues();
      this.onInput?.(this.value, prev);
    }
  }

  delete(event: KeyboardStorageEvent) {
    if (this.isDisabled) return;
    if (this.replaceSelected()) return;
    this.remember('delete');

    if (this.isCtrlKey(event)) {
      const finish = this.findWordFinish(this.cursorPosition);
      this.valueChars.splice(this.cursorPosition, finish - this.cursorPosition);
    } else {
      this.valueChars.splice(this.cursorPosition, 1);
    }
    this.isSelected = false;

    this.scrollToView();
    const prev = this.value;
    this.setValues();
    this.onInput?.(this.value, prev);
  }

  write(val: string, isRememberAsPart?: boolean) {
    if (this.isDisabled) return;
    if (this.replaceSelected(val)) return;
    if (
      (val === ' ' && this.prevTypedValue !== ' ') ||
      !this.value ||
      this.memoryPosition < this.memory.length ||
      this.shadowCursorPosition !== this.cursorPosition
    )
      this.remember('write');

    const value = this.maxLimitedValue(val);

    const deltaPosition = this.insertValueChars(value, this.cursorPosition, 0);
    this.setCursorPosition(this.cursorPosition + deltaPosition);

    this.isSelected = false;
    this.prevTypedValue = value!;
    if (!isRememberAsPart) this.shadowCursorPosition = this.cursorPosition;
    if (!this.isCapsLock) this.event.shiftKey = false;
    const prev = this.value;
    this.setValues();
    this.onInput?.(this.value, prev);
    this.scrollToView();
  }

  async paste(position?: 'before' | 'after') {
    if (this.isDisabled) return;
    try {
      const val = await navigator.clipboard.readText();
      const value = this.type === 'number' ? val.replace(makeRegExp('/\\D+/g'), '') : val;
      if (value && position) {
        this.isSelected = false;
        this.setCursorPosition(position === 'before' ? Math.min(...this.selected) : Math.max(...this.selected));
      }
      value && this.write(value, true);
    } catch (error) {}
  }

  copy() {
    if (this.isDisabled) return;
    if (this.isSelected) {
      const [start, finish] = [...this.selected].sort((a, b) => a - b);
      navigator.clipboard.writeText(this.value.slice(start, finish));
      this.isSelected = false;
      this.forceUpdate();
    }
  }

  cut() {
    if (this.isDisabled) return;
    if (this.isSelected) {
      const [start, finish] = [...this.selected].sort((a, b) => a - b);
      navigator.clipboard.writeText(this.value.slice(start, finish));
      if (this.replaceSelected('')) return;
      this.scrollToView();
    }
  }
}
