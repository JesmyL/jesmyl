import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { StoragesDateTimestampTitle } from '$storages/entities/DateTimestampTitle';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';
import { StoragesCellDatesNestedDateCell } from './DatesNestedDate';

const minShowCount = 3;
const maxLimCount = 5;
type CellContain = { mi: StoragesNestedCellMi; coli: number } | null;
let openDateMiAtom: Atom<CellContain>;

export const StoragesCellOfTypeDates = (props: StoragesCellTypeProps<StoragesColumnType.Dates>) => {
  openDateMiAtom ??= atom<CellContain>(null);

  const isEdit = useStoragesIsEditInnersContext();
  const [isExpand, setIsExpand] = useState(false);
  const dates = props.cell?.[1]?.nst;

  if (!isEdit && !dates?.length) return;

  let firstUndatedCelli = dates?.findIndex(cell => cell.ts == null) ?? Number.MAX_SAFE_INTEGER;
  if (firstUndatedCelli < 0) firstUndatedCelli = dates?.length ?? 0;
  const isNeedExpand = firstUndatedCelli >= maxLimCount;

  const mapCellNode = dates
    ? (dateCell: (typeof dates)[number], dateCelli: number) => {
        if (dateCell == null) return;

        return (
          <div
            key={dateCell.ts ?? dateCelli}
            className="my-3"
          >
            <Button onClick={() => openDateMiAtom.set({ coli: props.coli, mi: dateCell.mi })}>
              <StoragesDateTimestampTitle timestamp={dateCell.ts} />
              {dateCell.dsc && <span className="text-x7"> {dateCell.dsc}</span>}
              <LazyIcon icon="ArrowRight01" />
            </Button>
          </div>
        );
      }
    : () => null;

  const headCells = dates?.slice(0, firstUndatedCelli < 0 ? minShowCount : Math.min(minShowCount, firstUndatedCelli));
  const moreCells = firstUndatedCelli > 0 ? dates?.slice(minShowCount, firstUndatedCelli) : null;

  return (
    <div>
      <div className="flex gap-2">
        {props.columnTitleNode()}
        {isNeedExpand && (
          <Button
            icon={isExpand ? 'ArrowUp01' : 'ArrowDown01'}
            onClick={() => setIsExpand(is => !is)}
          />
        )}
      </div>
      <ConditionalRender
        value={dates?.length}
        render={() =>
          isNeedExpand ? (
            <>
              {headCells?.map(mapCellNode)}
              {!moreCells?.length ||
                (isExpand ? moreCells.map(mapCellNode) : <Button onClick={() => setIsExpand(is => !is)}>...</Button>)}
              {isEdit && firstUndatedCelli > 0 && dates?.slice(firstUndatedCelli).map(mapCellNode)}
            </>
          ) : isEdit ? (
            dates?.map(mapCellNode)
          ) : (
            <>
              {headCells?.map(mapCellNode)}
              {moreCells?.map(mapCellNode)}
            </>
          )
        }
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
                cardi: props.card.i,
              })
            }
          >
            Новая дата
          </Button>
        </ButtonGroup.Root>
      )}

      <Modal
        openAtom={openDateMiAtom}
        checkIsOpen={val => val?.coli === props.coli}
        isRenderHere
      >
        {({ mi: dateMi }) => (
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
