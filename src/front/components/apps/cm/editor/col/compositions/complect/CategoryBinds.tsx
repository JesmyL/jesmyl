import { IconButton, IconCheckbox, LazyIcon } from '#shared/ui/icon';
import { cmIDB } from '@cm/basis/lib/cmIdb';
import { InputWithLoadingIcon } from '@cm/basis/ui/InputWithLoadingIcon';
import { useLiveQuery } from 'dexie-react-hooks';
import { cmCatClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useMemo } from 'react';
import { emptyFunc, makeRegExp } from 'shared/utils';
import { EditContainerCorrectsInformer } from '../../../edit-container-corrects-informer/EditContainerCorrectsInformer';
import { EditableCat } from '../../categories/EditableCat';
import { useEditableCcom } from '../useEditableCcom';

export function CategoryBinds() {
  const ccom = useEditableCcom();
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());
  const cats = useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);

  if (!ccom || cats == null) return null;

  return (
    <>
      <div className="cat-list-title">Сборники</div>
      {cats.map(cat => {
        return cat.kind !== 'dict' ? null : (
          <EditContainerCorrectsInformer
            key={cat.wid}
            corrects={ccom.corrects[`setCatNativeNum:${cat.wid}`]}
          >
            <InputWithLoadingIcon
              icon="BookOpen02"
              label={cat.name}
              type="number"
              defaultValue={`${cat.dict?.[ccom.wid] || ''}`}
              onChange={value => {
                if (!+value) {
                  return cmCatClientInvocatorMethods.removeNativeComNum(null, ccom.wid, cat.wid);
                }

                if (value.match(makeRegExp('/\\D/'))) return Promise.reject();

                return cmCatClientInvocatorMethods.setNativeComNum(null, ccom.wid, cat.wid, +value);
              }}
              onInput={emptyFunc}
            />
            {cat.dict?.[ccom.wid] != null && (
              <IconButton
                icon="Cancel01"
                postfix={isNaN(cat.dict?.[ccom.wid]!) ? 'Корректно очистить' : 'Удалить'}
                confirm={`Очистить номер из сборника ${cat.name}?`}
                className="pointer color--ko margin-big-gap-l margin-gap-b"
                onClick={() => cmCatClientInvocatorMethods.removeNativeComNum(null, ccom.wid, cat.wid)}
              />
            )}
          </EditContainerCorrectsInformer>
        );
      })}
      <div className="cat-list-title">Списки</div>
      {cats.map(cat => {
        return cat.kind !== 'list' ? null : (
          <EditContainerCorrectsInformer
            key={cat.wid}
            corrects={ccom.corrects[`setCatNativeNum:${cat.wid}`]}
            className="flex flex-gap flex-max pointer"
            onClick={() => cmCatClientInvocatorMethods.toggleComExistence(null, ccom.wid, cat.wid)}
          >
            <LazyIcon icon="ListView" />
            <span>{cat.name} </span>
            <IconCheckbox checked={cat.stack?.some(comw => ccom.wid === comw)} />
          </EditContainerCorrectsInformer>
        );
      })}
    </>
  );
}
