import { Eventer, EventerCallback, EventerListeners, EventerValueCallback } from 'shared/utils';

type ThrowEventKeyDownKey = 'Escape' | 'Enter';

class ThrowEventClass {
  private keyDownListens: Record<ThrowEventKeyDownKey, EventerListeners<KeyboardEvent>> = {
    Escape: [],
    Enter: [],
  };

  private windowFocusEvents = Eventer.createValue<boolean>();
  private windowOnlineEvents = Eventer.createValue<boolean>();

  constructor() {
    window.addEventListener('keydown', event => {
      if (this.keyDownListens[event.code as ThrowEventKeyDownKey])
        Eventer.invoke(this.keyDownListens[event.code as ThrowEventKeyDownKey], event);
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

  listenIsOnline = (cb: EventerValueCallback<boolean>) => {
    cb(window.navigator?.onLine);
    return this.windowOnlineEvents.listen(cb);
  };

  muteIsOnline = (cb: EventerValueCallback<boolean>) => {
    this.windowOnlineEvents.mute(cb);
  };

  listenIsWinFocused = (cb: EventerValueCallback<boolean>) => {
    return this.windowFocusEvents.listen(cb);
  };

  muteIsWinFocused = (cb: EventerValueCallback<boolean>) => {
    this.windowFocusEvents.mute(cb);
  };
}

export const ThrowEvent = new ThrowEventClass();
