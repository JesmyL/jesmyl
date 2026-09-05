import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmEditorCat } from '$cm+editor/entities/cat';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditCatClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmIDB } from '$cm/ext';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { checkIsNil } from 'shared/utils/checkIs';

export const CmEditorComTabCategoryBinds = ({ ccom }: { ccom: EditableCom }) => {
  const icats = useLiveQuery(() => cmIDB.db.cats.toArray());
  const cats = useMemo(() => icats?.map(icat => new CmEditorCat(icat)), [icats]);
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!cats) return;

  return (
    <>
      <div className="cat-list-title">{translateBase(it => it.dicts)}</div>
      {cats.map(cat => {
        return (
          cat.kind === 'dict' && (
            <React.Fragment key={cat.wid}>
              <InputWithLoadingIcon
                icon="BookOpen02"
                label={cat.name}
                type="tel"
                inputClassName="bg-x1!"
                disabled={!checkAccess('cm', 'COM_CAT', 'U')}
                defaultValue={`${cat.dict[ccom.wid] || ''}`}
                strongDefaultValue
                onChanged={value => {
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
              />
              {checkIsNil(cat.dict[ccom.wid]) || (
                <TheIconButton
                  icon="Cancel01"
                  postfix={translateBase(it => it.del)}
                  confirm={translateBase(it => it.cm.com.clearDictNumN, { n: cat.name })}
                  className="pointer text-xKO ml-5 mb-2"
                  disabled={!checkAccess('cm', 'COM_CAT', 'U')}
                  disabledReason={translateBase(it => it.denied)}
                  onClick={() =>
                    cmEditCatClientTsjrpcMethods.removeNativeComNum({
                      comw: ccom.wid,
                      catw: cat.wid,
                    })
                  }
                />
              )}
            </React.Fragment>
          )
        );
      })}
      <div className="cat-list-title">{translateBase(it => it.lists)}</div>
      {cats.map(cat => {
        return (
          cat.kind === 'list' && (
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
                checked={cat.stackSet.has(ccom.wid)}
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
