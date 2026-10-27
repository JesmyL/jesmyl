import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { HorizontalDirection } from '#shared/model/Direction';
import { switchPresentationSlideByDirection } from '$presentations/shared/lib/presentation-broadcast';
import { useEffect } from 'react';

const textInputTagNameSet = new Set(['INPUT', 'TEXTAREA']);

const isTextInputEvent = (event: KeyboardEvent) =>
  event.target instanceof HTMLElement &&
  (textInputTagNameSet.has(event.target.tagName) || event.target.isContentEditable);

export const usePresentationsBroadcastKeyListener = (win: Window) => {
  useEffect(
    () =>
      hookEffectPipe()
        .pipe(
          addEventListenerPipe(win, 'keydown', event => {
            if (isTextInputEvent(event)) return;

            let direction: HorizontalDirection | nil;

            switch (event.code) {
              case 'ArrowLeft':
              case 'ArrowUp':
                direction = HorizontalDirection.RightToLeft;
                break;
              case 'ArrowRight':
              case 'ArrowDown':
                direction = HorizontalDirection.LeftToRight;
                break;
              default:
                return;
            }

            if (!switchPresentationSlideByDirection(direction)) return;

            event.preventDefault();
            event.stopPropagation();
          }),
        )
        .effect(),
    [win],
  );
};
