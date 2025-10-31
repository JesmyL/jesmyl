import { DatePicker } from '#shared/components/DatePicker';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { StoragesDateTimestampTitle } from '$storages/entities/DateTimestampTitle';
import { storagesExcludeColumnTypesForDatedNestedCell } from '$storages/shared/const/exclude.const';
import { StoragesIsEditInnersContext, useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useState } from 'react';
import { StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';
import { storagesCellComponents } from '../const/cellComponents';
import { StoragesCellTypeProps } from '../model/model';

const isOpenAddColumnModalAtom = atom(false);

const maxTitleLength = 10;

export const StoragesCellDatesNestedDateCell = (
  props: StoragesCellTypeProps<StoragesColumnType.Dates> & {
    dateMi: StoragesNestedCellMi;
  },
) => {
  const [isSelfEdit, setIsSelfEdit] = useState(false);
  const isCardEdit = useStoragesIsEditInnersContext();
  const cardCell = props.cell?.row?.find(it => it.mi === props.dateMi);

  const disabledDates = props.cell?.row.map(it => new Date((it.ts ?? Number.MAX_SAFE_INTEGER) * 100000));

  const isEdit = isSelfEdit || isCardEdit;

  return (
    <>
      <ModalHeader className="flex justify-between">
        <span className="text-x7 flex gap-2">
          <StoragesDateTimestampTitle timestamp={cardCell?.ts} />
          <span>{props.card.title}</span>
        </span>

        {isCardEdit || (
          <Button
            icon={isSelfEdit ? 'CheckmarkCircle01' : 'Edit02'}
            onClick={() => setIsSelfEdit(it => !it)}
          />
        )}
      </ModalHeader>
      <ModalBody className="flex flex-col gap-5 custom-align-items">
        {cardCell && (
          <>
            {isEdit ? (
              <>
                <DatePicker
                  initValue={(cardCell?.ts ?? Number.MAX_SAFE_INTEGER) * 100000}
                  disabled={disabledDates}
                  onSelect={date => {
                    const dateTime = date?.getTime();
                    if (!dateTime || mylib.isNaN(dateTime)) return;

                    return storagesTsjrpcClient.editNestedCellProp({
                      rackw: props.rack.w,
                      coli: props.coli,
                      cardMi: props.card.mi,
                      partialProps: { ts: Math.trunc(dateTime / 100000) },
                      sortRow: { prop: 'ts', asc: false },
                      ...props.nestedSelectors,
                    });
                  }}
                />

                <TextInput
                  label={`Описание (${maxTitleLength} символов)`}
                  defaultValue={cardCell?.title}
                  maxLength={maxTitleLength}
                  onChanged={() => {}}
                />
              </>
            ) : (
              cardCell?.title
            )}
          </>
        )}

        {props.column.cols?.map((nestedColumn, nestedColumni) => {
          const Component = storagesCellComponents[nestedColumn.t];

          const column = props.column?.cols?.[nestedColumni];

          if (column == null) return;

          return (
            <div key={nestedColumni}>
              <StoragesIsEditInnersContext value={isEdit}>
                <Component
                  {...props}
                  card={props.card}
                  coli={props.coli}
                  cell={cardCell?.row?.[nestedColumni] as null}
                  rack={props.rack}
                  column={column}
                  nestedSelectors={{
                    nestedCellMi: props.dateMi,
                    nestedColi: nestedColumni,
                  }}
                />
              </StoragesIsEditInnersContext>
            </div>
          );
        })}
      </ModalBody>

      <ModalFooter>
        {isEdit && (
          <StoragesAddColumn
            isOpenModalAtom={isOpenAddColumnModalAtom}
            excludeColumnTypes={storagesExcludeColumnTypesForDatedNestedCell}
            onAdd={async (type, title) => {
              if (type === StoragesColumnType.Date || type === StoragesColumnType.Dates) return;

              return storagesTsjrpcClient.createColumn({
                rackw: props.rack.w,
                title,
                newColumnType: type,
                coli: props.coli,
              });
            }}
          />
        )}
      </ModalFooter>
    </>
  );
};
