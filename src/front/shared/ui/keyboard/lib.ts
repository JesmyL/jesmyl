import { KeyboardInputStorage } from './KeyboardStorage';

export const keyboardInputGlobals = {
  currentInput: new KeyboardInputStorage(),
  topForceUpdate: () => {},
  topOnBlur: () => {},
  topOnFocus: (_currentInput: KeyboardInputStorage | nil) => {},
};
