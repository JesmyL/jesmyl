import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { RefObject, useEffect } from 'react';
import { StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';

export const useStoragesHighlighUsedFormulaRefs = (
  inputRef: RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>,
  coli: number,
  cols: (StoragesRackColumn<StoragesColumnType> | nil)[] | nil,
) => {
  useEffect(() => {
    let elemCollection: NodeListOf<Element> | nil;
    const className = 'opacity-50!';
    const notSelector =
      cols?.[coli]?.t === StoragesColumnType.Number
        ? '[storages-col-type],'
        : `[storages-col-type]:not([storages-col-type="${StoragesColumnType.Number}"]):not([storages-col-type="${StoragesColumnType.Formula}"]),`;

    const selector = `
        ${notSelector}
        [storages-coli="${coli}"],
        [storages-formula-used-coli]:not([storages-formula-used-coli="${coli}"])`;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'focus', () => {
          elemCollection = document.querySelectorAll(selector);
          elemCollection.forEach(elem => elem.classList.add(className));
        }),
        addEventListenerPipe(inputRef.current, 'blur', () => {
          elemCollection = document.querySelectorAll(selector);
          elemCollection.forEach(elem => elem.classList.remove(className));
        }),
      )
      .effect(() => {
        elemCollection?.forEach(elem => elem.classList.remove(className));
      });
  }, [coli, cols, inputRef]);
};
