import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { mylib } from 'front/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelectedComs from '../../../../../../../07-basis/lib/hooks/cm/useSelectedComs';
import { Com } from '../../Com';
import { currentComwIdPrefix, faceItemDescriptionClassName } from './_ComList';
import { IComFaceList } from './model';

export const useComListClickListener = (
  listRef: React.RefObject<HTMLDivElement>,
  importantOnClick: IComFaceList['importantOnClick'],
  list: Com[],
  toggleSelectedCom: ReturnType<typeof useSelectedComs>['toggleSelectedCom'],
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

            if (foundElementWithFaceItemClassName.classList.contains(faceItemDescriptionClassName)) {
              isFaceDescription = true;
            }

            if (foundElementWithFaceItemClassName.classList.contains('face-item')) break;

            foundElementWithFaceItemClassName = foundElementWithFaceItemClassName.parentElement;
          }

          if (isFaceDescription || !foundElementWithFaceItemClassName?.id.startsWith(currentComwIdPrefix)) return;

          const comw = +foundElementWithFaceItemClassName.id.slice(currentComwIdPrefix.length);

          if (mylib.isNaN(comw)) return;

          if (isFaceLogo) {
            event.stopPropagation();
            event.preventDefault();
            toggleSelectedCom(comw);
            return;
          }

          if (importantOnClick) {
            const com = list.find(com => com.wid === comw);
            if (!com) return;
            const comi = Array.from(foundElementWithFaceItemClassName.classList.values()).find(className =>
              className.endsWith('-comi'),
            );
            if (!comi) return;
            importantOnClick(com, parseInt(comi), event);
          } else navigate(`./${comw}`);
        }),
      )
      .effect();
  }, [importantOnClick, list, listRef, navigate, toggleSelectedCom]);
};
