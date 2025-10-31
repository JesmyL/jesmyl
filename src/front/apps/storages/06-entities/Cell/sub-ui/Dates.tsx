import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { StoragesDateTimestampTitle } from '$storages/entities/DateTimestampTitle';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useState } from 'react';
import { StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';
import { StoragesCellDatesNestedDateCell } from './DatesNestedDate';

const openDateMiAtom = atom<StoragesNestedCellMi | null>(null);

export const StoragesCellOfTypeDates = (props: StoragesCellTypeProps<StoragesColumnType.Dates>) => {
  const isEdit = useStoragesIsEditInnersContext();
  const [isExpand, setIsExpand] = useState(false);

  if (!isEdit && !props.cell?.row?.length) return;

  const firstUndatedCelli = props.cell?.row.findIndex(cell => cell.ts == null) ?? Number.MAX_SAFE_INTEGER;

  const mapCellNode = props.cell?.row
    ? (dateCell: (typeof props.cell.row)[number], dateCelli: number) => {
        if (dateCell == null) return;

        return (
          <div
            key={dateCell.ts ?? dateCelli}
            className="my-3"
          >
            <Button onClick={() => openDateMiAtom.set(dateCell.mi)}>
              <StoragesDateTimestampTitle timestamp={dateCell.ts} />
              {dateCell.title && <span className="text-x7"> {dateCell.title}</span>}
              <LazyIcon icon="ArrowRight01" />
            </Button>
          </div>
        );
      }
    : () => null;

  const moreCells = firstUndatedCelli > 0 ? props.cell?.row.slice(3, firstUndatedCelli).map(mapCellNode) : null;

  return (
    <div>
      <div className="flex gap-2">
        {props.column.title}
        <Button
          icon={isExpand ? 'ArrowUp01' : 'ArrowDown01'}
          onClick={() => setIsExpand(is => !is)}
        />
      </div>
      <ConditionalRender
        value={props.cell?.row.length}
        render={() => (
          <>
            {props.cell?.row.slice(0, firstUndatedCelli < 0 ? 3 : Math.min(3, firstUndatedCelli)).map(mapCellNode)}
            {!moreCells?.length || (isExpand ? moreCells : <div>...</div>)}
            {isEdit && firstUndatedCelli > 0 && props.cell?.row.slice(firstUndatedCelli).map(mapCellNode)}
          </>
        )}
        else={<div className="opacity-50 text-x7">Дат нет</div>}
      />

      {isEdit && (
        <ButtonGroup.Root>
          <Button
            icon="PlusSign"
            onClick={() =>
              storagesTsjrpcClient.createDatesNestedCell({
                rackw: props.rack.w,
                coli: props.coli,
                cardMi: props.card.mi,
              })
            }
          >
            Новая дата
          </Button>
        </ButtonGroup.Root>
      )}

      <Modal
        openAtom={openDateMiAtom}
        isRenderHere
      >
        {dateMi => (
          <StoragesCellDatesNestedDateCell
            {...props}
            dateMi={dateMi}
            nestedSelectors={{ nestedCellMi: dateMi }}
          />
        )}
      </Modal>
    </div>
  );
};
