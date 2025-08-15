import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Com } from '../../Com';
import { cmCurrentComwIdPrefix, cmFaceItemDescriptionClassName } from '../lib/consts';
import { IComFaceList } from './model';

export const useComListClickListener = (
  listRef: React.RefObject<HTMLDivElement | null>,
  importantOnClick: IComFaceList['importantOnClick'],
  list: Com[],
) => {
  const { toggleSelectedCom } = useSelectedComs();
  const router = useRouter();

  useEffect(() => {
    if (listRef.current === null) return;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(listRef.current, 'click', event => {
          let foundElementWithFaceItemClassName = event.target as HTMLElement | null;
          let isFaceLogo = false;
          let isFaceDescription = false;

          while (foundElementWithFaceItemClassName) {
            if (foundElementWithFaceItemClassName.classList.contains('face-logo')) {
              isFaceLogo = true;
            }

            if (foundElementWithFaceItemClassName.classList.contains(cmFaceItemDescriptionClassName)) {
              isFaceDescription = true;
            }

            if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;

            foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
          }

          if (isFaceDescription || !foundElementWithFaceItemClassName?.id.startsWith(cmCurrentComwIdPrefix)) return;

          const comw = +foundElementWithFaceItemClassName.id.slice(cmCurrentComwIdPrefix.length);

          if (mylib.isNaN(comw)) return;

          if (isFaceLogo) {
            event.stopPropagation();
            event.preventDefault();
            toggleSelectedCom(comw);
            return;
          }

          const defaultClick = () => {
            router.navigate({
              to: '.',
              search: prev => ({ ...(prev as object), comw }) as object,
            });
          };

          if (importantOnClick) {
            const com = list.find(com => com.wid === comw);
            if (!com) return;
            const comi = Array.from(foundElementWithFaceItemClassName.classList.values()).find(className =>
              className.endsWith('-comi'),
            );
            if (!comi) return;
            importantOnClick({ com, comi: parseInt(comi), event, defaultClick });
          } else defaultClick();
        }),
      )
      .effect();
  }, [importantOnClick, list, listRef, router, toggleSelectedCom]);
};
