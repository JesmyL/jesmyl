import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmEditCatClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { EditableCat } from '$cm+editor/basis/lib/EditableCat';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { emptyFunc } from 'shared/utils';

export const CmEditorTabComCategoryBinds = () => {
  const ccom = useEditableCcom();
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());
  const cats = useMemo(() => icats?.map(icat => new EditableCat(icat, [])), [icats]);
  const checkAccess = useCheckUserAccessRightsInScope();

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
              type="tel"
              className="bg-x1!"
              disabled={!checkAccess('cm', 'COM_CAT', 'U')}
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
                disabled={!checkAccess('cm', 'COM_CAT', 'U')}
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
        return (
          cat.kind !== 'list' || (
            <div
              key={cat.wid}
              className="my-5"
            >
              <IconCheckbox
                prefix={
                  <>
                    <LazyIcon icon="ListView" />
                    <span>{cat.name} </span>
                  </>
                }
                checked={cat.stack?.some(comw => ccom.wid === comw)}
                disabled={!checkAccess('cm', 'COM_CAT', 'U')}
                onClick={() =>
                  cmEditCatClientTsjrpcMethods.toggleComExistence({
                    comw: ccom.wid,
                    catw: cat.wid,
                  })
                }
              />
            </div>
          )
        );
      })}
    </>
  );
};
