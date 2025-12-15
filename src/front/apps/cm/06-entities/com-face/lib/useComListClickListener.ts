import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { CmCom } from '../../com/lib/Com';
import { cmComFaceCurrentComwIdPrefix, cmComFaceItemDescriptionClassName } from '../const/ids';
import { ICmComFaceList } from '../model/model';

export const useCmComFaceListClickListener = (
  listRef: React.RefObject<HTMLDivElement | null>,
  importantOnClick: ICmComFaceList['importantOnClick'],
  list: CmCom[],
) => {
  const navigate = useNavigate();

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

            if (foundElementWithFaceItemClassName.classList.contains(cmComFaceItemDescriptionClassName)) {
              isFaceDescription = true;
            }

            if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;

            foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
          }

          if (isFaceDescription || !foundElementWithFaceItemClassName?.id.startsWith(cmComFaceCurrentComwIdPrefix))
            return;

          const comw = +foundElementWithFaceItemClassName.id.slice(cmComFaceCurrentComwIdPrefix.length);

          if (mylib.isNaN(comw)) return;

          if (isFaceLogo) {
            event.stopPropagation();
            event.preventDefault();
            cmComSelectedComwsAtom.do.toggle(comw);
            return;
          }

          const defaultClick = () => {
            navigate({
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
  }, [importantOnClick, list, listRef, navigate]);
};
