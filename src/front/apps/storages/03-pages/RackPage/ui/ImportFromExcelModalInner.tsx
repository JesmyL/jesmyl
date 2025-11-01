import { Button } from '#shared/components/ui/button';
import { ExcelValueListExtracter } from '#shared/lib/hooks/ExcelValueListExtracter';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { EllipsisText } from '#shared/ui/EllipsisText';
import { ModalBody, ModalFooter, ModalHeader, useConfirm } from '#shared/ui/modal';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useState } from 'react';
import { storagesCellIncorrectValueNode } from 'shared/const/storages/cellIncorrectValueNode';
import { StoragesRack, StoragesRackCard, StoragesRackCardMi } from 'shared/model/storages/list.model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

type AssociationKey = keyof StoragesRack | StoragesColumnType;

export const StoragesRackImportFromExcelModalInner = (props: { rack: StoragesRack }) => {
  const [associations, setAssociations] = useState<PRecord<AssociationKey, string>>({});
  const [keyValues, setKeyValues] = useState<Record<string, Set<string>>>({});
  const [valueList, setValueList] = useState<Record<string, string>[] | null>(null);
  const confirm = useConfirm();

  const keysDropdown = (key: AssociationKey) => (
    <Dropdown
      id={associations[key]}
      items={mylib.keys(keyValues).map(id => ({ id, title: id }))}
      onSelectId={id => setAssociations(prev => ({ ...prev, [key]: id }))}
      renderItem={({ id }) => (
        <>
          {id}
          <EllipsisText
            text={[' (', Array.from(keyValues[id]).slice(0, 3).join(', '), ')']}
            cantExtend
          />
        </>
      )}
    />
  );

  return (
    <>
      <ModalHeader>Формирование карточек из Excel файла</ModalHeader>
      <ModalBody>
        {!valueList ? (
          <ExcelValueListExtracter
            onSuccess={(list, keyValues) => {
              setKeyValues(keyValues);
              setValueList(list);
            }}
          />
        ) : (
          <div className="*:my-2">
            <div>Проведите ассоциации для полей:</div>

            <div className="flex gap-3">
              <span className="text-x7">Название</span>
              {keysDropdown('title')}
            </div>

            {props.rack.cols.map((col, coli) => {
              const associatedField = associations[col.t];

              return (
                <div key={coli}>
                  <div className="flex gap-3">
                    <span className="text-x7">{col.title}</span>
                    {keysDropdown(col.t)}
                  </div>
                  {associatedField &&
                    valueList
                      .map((value, valuei) => {
                        if (value[associatedField] == null) return;
                        const error = storagesCellIncorrectValueNode[col.t].checkType(value[associatedField]);

                        return (
                          error && (
                            <div key={valuei}>
                              {'' + value[associatedField]} - <span className="text-xKO">{error}</span>
                            </div>
                          )
                        );
                      })
                      .filter(it => it)
                      .slice(0, 10)}
                </div>
              );
            })}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          icon="CheckmarkCircle01"
          disabled={!valueList?.length || !associations.title}
          onClick={async () => {
            const titleField = associations.title;
            if (valueList == null || titleField == null) return;
            const usetTitlesSet = new Set<string>();
            const isNoColFields = mylib.keys(associations).length === 1;

            const cards: StoragesRackCard[] = valueList
              .map(dict => {
                if (!dict[titleField] || usetTitlesSet.has(dict[titleField])) return null;
                usetTitlesSet.add(dict[titleField]);

                const card: StoragesRackCard = { title: dict[titleField], mi: StoragesRackCardMi.min };
                if (isNoColFields) return card;

                card.row = [];

                for (let coli = 0; coli < props.rack.cols.length; coli++) {
                  const colType = props.rack.cols[coli].t;
                  if (associations[colType] == null) continue;

                  const cell = storagesCellIncorrectValueNode[colType].mapStringToCell(dict[associations[colType]]);
                  if (cell == null) continue;
                  card.row[coli] = cell;
                }

                if (!card.row.length) delete card.row;

                return card;
              })
              .filter(card => card != null);

            if (!cards.length) return;

            const isRevert =
              cards.length !== valueList.length &&
              (await confirm(
                `Не все строки из файла были преобразованы в карточки. Получилось корректно сформировать ${cards.length} ${mylib.declension(cards.length, 'карточку', 'карточки', 'карточек')}`,
              ));

            if (!isRevert) return;

            await storagesTsjrpcClient.addManyCards({ cards, rackw: props.rack.w });
          }}
        >
          Сформировать карточки
        </Button>
      </ModalFooter>
    </>
  );
};
