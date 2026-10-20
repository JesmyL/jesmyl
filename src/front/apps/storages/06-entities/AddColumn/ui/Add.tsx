import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { TheStoragesColumnCreateColumn } from '$storages/entities/ColumnCreate';
import { Atom } from 'atomaric';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnCustomProperties, StoragesColumnType } from 'shared/model/storages/rack.model';

const columnTypeOrder = [
  StoragesColumnType.String,
  StoragesColumnType.List,
  StoragesColumnType.Link,
  StoragesColumnType.Number,
  StoragesColumnType.Text,
  StoragesColumnType.Date,
  StoragesColumnType.Dates,
  StoragesColumnType.Formula,
];

export const StoragesAddColumn = (props: {
  onAdd: <Type extends StoragesColumnType>(props: {
    newColumnType: Type;
    title: string;
    colCustomProps: Partial<{ [Type in StoragesColumnType]: StoragesColumnCustomProperties<Type> }>;
  }) => Promise<unknown>;
  isOpenModalAtom: Atom<boolean>;
  excludeColumnTypes?: Set<StoragesColumnType>;
  rack: StoragesRack;
  andTextButton?: React.ReactNode;
}) => {
  const prompt = usePrompt();

  return (
    <>
      <div className="flex justify-items-end custom-align-items flex-col">
        <Button
          icon="PlusSign"
          onClick={props.isOpenModalAtom.do.toggle}
        >
          {translateBase(BaseLocaleKey.StoragesNewField)}
        </Button>
      </div>

      <Modal openAtom={props.isOpenModalAtom}>
        <ModalHeader>{translateBase(BaseLocaleKey.StoragesFieldType)}</ModalHeader>
        <ModalBody className="flex flex-col gap-3 *:w-full">
          <div className="text-xKO font-bold">
            {translateBase(BaseLocaleKey.StoragesWillBeAdded)}{' '}
            {props.andTextButton ?? translateBase(BaseLocaleKey.StoragesToAllCards)}
          </div>

          {columnTypeOrder.map(colType => {
            if (props.excludeColumnTypes?.has(colType)) return;
            const { typeTitle, icon } = storagesColumnConfigDict[colType];

            return (
              <Button
                key={colType}
                icon={icon}
                onClick={async () => {
                  const colCustomProps = {};
                  const title = await prompt(
                    <>
                      <TheStoragesColumnCreateColumn
                        colType={colType}
                        rack={props.rack}
                        colCustomProps={colCustomProps}
                      />
                      {translateBase(BaseLocaleKey.StoragesNewFieldTitle)}
                    </>,
                    <>{translateBase(BaseLocaleKey.StoragesNewFieldType, { t: typeTitle })}</>,
                    typeTitle,
                  );

                  if (!title) return;
                  props.isOpenModalAtom.reset();

                  return props.onAdd({ newColumnType: +colType, title, colCustomProps: { [colType]: colCustomProps } });
                }}
              >
                {typeTitle}
              </Button>
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
};
