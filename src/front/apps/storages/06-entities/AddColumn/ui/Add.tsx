import { Button } from '#shared/components/ui/button';
import { MyLib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { TheStoragesColumnCreateColumn } from '$storages/entities/ColumnCreate';
import { Atom } from 'atomaric';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnCustomProperties, StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesAddColumn = (props: {
  onAdd: <Type extends StoragesColumnType>(props: {
    newColumnType: Type;
    title: string;
    colCustomProps: Partial<{ [Type in StoragesColumnType]: StoragesColumnCustomProperties<Type> }>;
  }) => Promise<unknown>;
  isOpenModalAtom: Atom<boolean>;
  excludeColumnTypes?: Set<StoragesColumnType>;
  rack: StoragesRack;
}) => {
  const prompt = usePrompt();

  return (
    <>
      <Button
        icon="PlusSign"
        onClick={props.isOpenModalAtom.do.toggle}
      >
        Создать новое специальное поле
      </Button>

      <Modal openAtom={props.isOpenModalAtom}>
        <ModalHeader>Выберите тип нового специального поля</ModalHeader>
        <ModalBody className="flex flex-col gap-3 *:w-full">
          {MyLib.entries(storagesColumnConfigDict).map(([type, { typeTitle, icon }]) => {
            if (props.excludeColumnTypes?.has(+type)) return;

            return (
              <Button
                key={type}
                icon={icon}
                onClick={async () => {
                  const colCustomProps = {};
                  const title = await prompt(
                    <>
                      <TheStoragesColumnCreateColumn
                        colType={+type}
                        rack={props.rack}
                        colCustomProps={colCustomProps}
                      />
                      Название для нового поля
                    </>,
                    <>
                      Новое поле с типом <span className="text-x7">{typeTitle}</span>
                    </>,
                    typeTitle,
                  );

                  if (!title) return;
                  props.isOpenModalAtom.reset();

                  return props.onAdd({ newColumnType: +type, title, colCustomProps: { [type]: colCustomProps } });
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
