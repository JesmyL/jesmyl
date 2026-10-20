import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { storagesExcludeColumnTypesForDatedNestedCell } from '$storages/shared/const/exclude.const';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { itNIt } from 'shared/utils';
import { TheStoragesColumnEditColumn } from './Column';

let isOpenAddColumnModalAtom: Atom<boolean>;

export const StoragesColumnEditNestedFields = (props: {
  column: StoragesRackColumn<StoragesColumnType>;
  rack: StoragesRack;
  coli: number;
}) => {
  isOpenAddColumnModalAtom ??= atom(false);

  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="mt-7">
      <Button
        icon={isExpand ? 'ArrowUp01' : 'ArrowDown01'}
        onClick={() => setIsExpand(itNIt)}
      >
        {translateBase(BaseLocaleKey.StoragesSpecialFields)}
      </Button>

      {isExpand && (
        <>
          {props.column.cols?.map((column, columni) => {
            return (
              column.t !== props.column.t && (
                <TheStoragesColumnEditColumn
                  key={columni}
                  coli={props.coli}
                  grabNode
                  rack={props.rack}
                  nestedSelectors={{ nestedColi: columni }}
                />
              )
            );
          })}

          <StoragesAddColumn
            isOpenModalAtom={isOpenAddColumnModalAtom}
            rack={props.rack}
            andTextButton={translateBase(BaseLocaleKey.StoragesNestedCards, { t: props.column.title })}
            excludeColumnTypes={storagesExcludeColumnTypesForDatedNestedCell}
            onAdd={({ newColumnType, title, colCustomProps }) =>
              storagesTsjrpcClient.createColumn({
                rackw: props.rack.w,
                title,
                newColumnType,
                colCustomProps,
                coli: props.coli,
              })
            }
          />
        </>
      )}
    </div>
  );
};
