import { Eventer, EventerCallback, EventerListeners, EventerValueCallback } from 'shared/utils';

type ThrowEventKeyDownKey = 'Escape' | 'Enter';

class ThrowEventClass {
  private keyDownListens: Record<ThrowEventKeyDownKey, EventerListeners<KeyboardEvent>> = {
    Escape: [],
    Enter: [],
  };
  private keyUpListens: Record<ThrowEventKeyDownKey, EventerListeners<KeyboardEvent>> = {
    Escape: [],
    Enter: [],
  };

  private windowFocusEvents = Eventer.createValue<boolean>();
  private windowOnlineEvents = Eventer.createValue<boolean>();

  constructor() {
    window.addEventListener('keydown', event => {
      // Защита от неописанных в ThrowEventKeyDownKey клавиш (event.code может быть любым)
      if (event.code in this.keyDownListens)
        Eventer.invoke(this.keyDownListens[event.code as ThrowEventKeyDownKey], event);
    });

    window.addEventListener('keyup', event => {
      if (event.code in this.keyUpListens) Eventer.invoke(this.keyUpListens[event.code as ThrowEventKeyDownKey], event);
    });

    window.addEventListener('focus', () => {
      this.windowFocusEvents.invoke(true);
    });
    window.addEventListener('blur', () => {
      this.windowFocusEvents.invoke(false);
    });

    window.addEventListener('online', () => {
      this.windowOnlineEvents.invoke(true);
    });
    window.addEventListener('offline', () => {
      this.windowOnlineEvents.invoke(false);
    });
  }

  listenKeyDown = (key: ThrowEventKeyDownKey, cb: EventerCallback<KeyboardEvent>) => {
    return Eventer.listen(this.keyDownListens[key], cb);
  };

  muteKeyDown = (key: ThrowEventKeyDownKey, cb: EventerCallback<KeyboardEvent>) => {
    Eventer.mute(this.keyDownListens[key], cb);
  };

  listenKeyUp = (key: ThrowEventKeyDownKey, cb: EventerCallback<KeyboardEvent>) => {
    return Eventer.listen(this.keyUpListens[key], cb);
  };

  muteKeyUp = (key: ThrowEventKeyDownKey, cb: EventerCallback<KeyboardEvent>) => {
    Eventer.mute(this.keyUpListens[key], cb);
  };

  listenIsOnline = (cb: EventerValueCallback<boolean>) => {
    // Безопасное извлечение начального значения и передача в listen как initValue (второй аргумент)
    const currentStatus = typeof window !== 'undefined' ? window.navigator?.onLine : true;
    return this.windowOnlineEvents.listen(cb, currentStatus);
  };

  muteIsOnline = (cb: EventerValueCallback<boolean>) => {
    this.windowOnlineEvents.mute(cb);
  };

  listenIsWinFocused = (cb: EventerValueCallback<boolean>) => {
    // Передаем текущий фокус как initValue, чтобы коллбек сразу получил актуальное состояние
    const currentFocus = typeof document !== 'undefined' ? document.hasFocus() : true;
    return this.windowFocusEvents.listen(cb, currentFocus);
  };

  muteIsWinFocused = (cb: EventerValueCallback<boolean>) => {
    this.windowFocusEvents.mute(cb);
  };
}

export const ThrowEvent = new ThrowEventClass();
