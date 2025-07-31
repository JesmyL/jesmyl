import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditCatClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCat } from '$cm+editor/basis/lib/EditableCat';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { emptyFunc } from 'shared/utils';

export const CmEditorTabComCategoryBinds = () => {
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
                  return cmEditCatClientTsjrpcMethods.removeNativeComNum({ comw: ccom.wid, catw: cat.wid });
                }

                if (value.match(makeRegExp('/\\D/'))) return Promise.reject();

                return cmEditCatClientTsjrpcMethods.setNativeComNum({
                  comw: ccom.wid,
                  catw: cat.wid,
                  value: +value,
                });
              }}
              onInput={emptyFunc}
            />
            {cat.dict?.[ccom.wid] != null && (
              <TheIconButton
                icon="Cancel01"
                postfix={isNaN(cat.dict?.[ccom.wid as never]) ? 'Корректно очистить' : 'Удалить'}
                confirm={`Очистить номер из сборника ${cat.name}?`}
                className="pointer color--ko margin-big-gap-l margin-gap-b"
                onClick={() =>
                  cmEditCatClientTsjrpcMethods.removeNativeComNum({
                    comw: ccom.wid,
                    catw: cat.wid,
                  })
                }
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
            onClick={() =>
              cmEditCatClientTsjrpcMethods.toggleComExistence({
                comw: ccom.wid,
                catw: cat.wid,
              })
            }
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
