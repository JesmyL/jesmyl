export class KeyboardStorageBase {
  value: string = '';
  onInput?: (value: string, prev: string | null) => void;
  onChange?: (value: string, prev: string | null) => void;
  onFocus?: () => void;
  forceUpdate: () => void = () => {};
  onBlur: () => void = () => {};
  isFocused = false;
  isMultiline?: boolean = false;
  isSelected = false;
  focusedCharItem: HTMLSpanElement | nil;
  isOverflowKeyDown = false;

  focus(rejectForceUpdate?: boolean) {
    if (!this.isFocused) this.onFocus?.();
    this.isFocused = true;
    if (!rejectForceUpdate) this.forceUpdate();
  }

  blur(resetSelected = false): boolean {
    if (resetSelected) this.isSelected = false;

    if (this.isFocused) {
      this.isFocused = false;
      this.forceUpdate();
      this.onBlur();
      this.forceUpdate();
      this.isOverflowKeyDown = false;

      return true;
    }

    return false;
  }

  textUpdate(prev: string) {
    this.onChange?.(this.value, prev);
    this.forceUpdate();
  }

  scrollToView(
    arg: ScrollIntoViewOptions | boolean = {
      block: 'nearest',
      inline: 'nearest',
    },
  ) {
    if (this.isFocused) this.focusedCharItem?.scrollIntoView(arg);
  }
}
