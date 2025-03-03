import { IconButton } from '#shared/ui/the-icon/IconButton';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '@cm/_db/cm-idb';
import { InputWithLoadingIcon } from '@cm/base/InputWithLoadingIcon';
import { cmCatClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { EditableCat } from '@cm/editor/lib/EditableCat';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useMemo } from 'react';
import { emptyFunc, makeRegExp } from 'shared/utils';
import { useEditableCcom } from '../../../../lib/useEditableCom';

export const CmCategoryBindsRedactorTab = () => {
  const ccom = useEditableCcom();
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());
  const cats = useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);

  if (!ccom || cats == null) return null;

  return (
    <>
      <div className="cat-list-title">Сборники</div>
      {cats.map(cat => {
        return cat.kind !== 'dict' ? null : (
          <React.Fragment key={cat.wid}>
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
                postfix={isNaN(cat.dict?.[ccom.wid as never]) ? 'Корректно очистить' : 'Удалить'}
                confirm={`Очистить номер из сборника ${cat.name}?`}
                className="pointer color--ko margin-big-gap-l margin-gap-b"
                onClick={() => cmCatClientInvocatorMethods.removeNativeComNum(null, ccom.wid, cat.wid)}
              />
            )}
          </React.Fragment>
        );
      })}
      <div className="cat-list-title">Списки</div>
      {cats.map(cat => {
        return cat.kind !== 'list' ? null : (
          <div
            key={cat.wid}
            className="flex flex-gap flex-max pointer margin-big-gap-v"
            onClick={() => cmCatClientInvocatorMethods.toggleComExistence(null, ccom.wid, cat.wid)}
          >
            <LazyIcon icon="ListView" />
            <span>{cat.name} </span>
            <IconCheckbox checked={cat.stack?.some(comw => ccom.wid === comw)} />
          </div>
        );
      })}
    </>
  );
};
