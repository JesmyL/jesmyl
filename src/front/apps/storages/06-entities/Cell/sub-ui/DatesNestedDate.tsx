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
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';
import { storagesCellComponents } from '../const/cellComponents';
import { StoragesCellTypeProps } from '../model/model';

let isOpenAddColumnModalAtom: Atom<boolean>;
const maxTitleLength = 10;

export const StoragesCellDatesNestedDateCell = (
  props: StoragesCellTypeProps<StoragesColumnType.Dates> & {
    dateMi: StoragesNestedCellMi;
  },
) => {
  isOpenAddColumnModalAtom ??= atom(false);

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
        </span>

        {isCardEdit || (
          <Button
            icon={isSelfEdit ? 'CheckmarkCircle01' : 'Edit02'}
            onClick={() => setIsSelfEdit(it => !it)}
          />
        )}
      </ModalHeader>
      <ModalBody className="flex flex-col gap-5 custom-align-items">
        {isEdit ? (
          <>
            <DatePicker
              initValue={(cardCell?.ts ?? Number.MAX_SAFE_INTEGER) * 100000}
              disabled={disabledDates}
              onSelect={date => {
                const dateTime = date?.getTime();
                if (!dateTime || mylib.isNaN(dateTime)) return;

                return storagesTsjrpcClient.editNestedCellProp({
                  ...props.nestedSelectors,
                  rackw: props.rack.w,
                  coli: props.coli,
                  cardi: props.card.i,
                  partialProps: { ts: Math.trunc(dateTime / 100000) },
                  sortRow: { prop: 'ts', asc: false },
                });
              }}
            />

            <TextInput
              label={`Описание (${maxTitleLength} символов)`}
              defaultValue={cardCell?.title}
              maxLength={maxTitleLength}
              onChanged={title =>
                storagesTsjrpcClient.editNestedCellProp({
                  ...props.nestedSelectors,
                  rackw: props.rack.w,
                  coli: props.coli,
                  cardi: props.card.i,
                  partialProps: { title },
                })
              }
            />
          </>
        ) : (
          cardCell?.title
        )}

        <StoragesIsEditInnersContext value={isEdit}>
          {props.column.cols?.map((nestedColumn, nestedColumni) => {
            const Component = storagesCellComponents[nestedColumn.t];

            const column = props.column?.cols?.[nestedColumni];

            if (column == null || column.t === props.column.t) return;

            return (
              <div key={nestedColumni}>
                <Component
                  {...props}
                  card={props.card}
                  coli={props.coli}
                  cell={cardCell?.row?.[nestedColumni] as null}
                  rack={props.rack}
                  column={column as never}
                  icon={storagesColumnConfigDict[column.t].icon}
                  columnTitleNode={editPostfix =>
                    isEdit ? (
                      <div>
                        <span
                          className="text-x7"
                          storages-coli={nestedColumni}
                          storages-col-type={props.rack.cols[props.coli].cols?.[nestedColumni].t}
                        >
                          #{nestedColumni + 1}{' '}
                        </span>
                        {column.title}
                        {editPostfix}
                      </div>
                    ) : (
                      column.title
                    )
                  }
                  nestedSelectors={{
                    nestedCellMi: props.dateMi,
                    nestedColi: nestedColumni,
                  }}
                />
              </div>
            );
          })}
        </StoragesIsEditInnersContext>
      </ModalBody>

      <ModalFooter>
        {isEdit && (
          <StoragesAddColumn
            isOpenModalAtom={isOpenAddColumnModalAtom}
            excludeColumnTypes={storagesExcludeColumnTypesForDatedNestedCell}
            rack={props.rack}
            andTextButton={<>во все {props.column.title} во всех карточках</>}
            onAdd={async ({ newColumnType, title, colCustomProps }) => {
              if (newColumnType === StoragesColumnType.Date || newColumnType === StoragesColumnType.Dates) return;

              return storagesTsjrpcClient.createColumn({
                rackw: props.rack.w,
                title,
                newColumnType,
                coli: props.coli,
                colCustomProps,
              });
            }}
          />
        )}
      </ModalFooter>
    </>
  );
};
