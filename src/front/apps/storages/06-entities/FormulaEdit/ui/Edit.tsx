import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesMakeActualFormulaProps } from '$storages/shared/lib/formulaComputing';
import { useStoragesHighlighUsedFormulaRefs } from '$storages/shared/lib/useHighlighUsedFormulaRefs';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useRef } from 'react';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesNestedCellSelectors, StoragesRackColumn } from 'shared/model/storages/rack.model';

type Props = {
  coli: number;
  column: StoragesRackColumn<StoragesColumnType.Formula>;
  rack: StoragesRack;
  nestedSelectors: StoragesNestedCellSelectors | nil;
};

export const StoragesFormulaEditValue = (props: Props) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const { coli, cols } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: null,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  useStoragesHighlighUsedFormulaRefs(inputRef, coli, cols);

  return (
    <div className="flex gap-3">
      <InputWithLoadingIcon
        icon={storagesColumnConfigDict[props.column.t].icon}
        inputRef={inputRef}
        defaultValue={props.column.val}
        strongDefaultValue
        multiline
        onChanged={value =>
          storagesTsjrpcClient.editColumnFields({
            rackw: props.rack.w,
            coli: props.coli,
            data: { [StoragesColumnType.Formula]: { val: value } },
            ...props.nestedSelectors,
          })
        }
      />
      <Dropdown
        id={props.column.fx ?? 2}
        hiddenArrow
        items={[0, 1, 2, 3, 4, 5].map(fx => ({ id: fx, title: fx }))}
        renderItem={({ node }) => <div>После запятой - {node} зн.</div>}
        onSelectId={fx =>
          storagesTsjrpcClient.editColumnFields({
            rackw: props.rack.w,
            coli: props.coli,
            data: { [StoragesColumnType.Formula]: { fx } },
            ...props.nestedSelectors,
          })
        }
      />
    </div>
  );
};
