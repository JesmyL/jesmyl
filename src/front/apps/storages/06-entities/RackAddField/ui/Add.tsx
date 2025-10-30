import { Button } from '#shared/components/ui/button';
import { MyLib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { Atom } from 'atomaric';
import { StoragesFieldType } from 'shared/model/storages/rack.model';

export const StoragesRackAddField = ({
  onAdd,
  isOpenModalAtom,
  excludeFieldTypes,
}: {
  onAdd: (type: StoragesFieldType, title: string) => Promise<unknown>;
  isOpenModalAtom: Atom<boolean>;
  excludeFieldTypes?: Set<StoragesFieldType>;
}) => {
  const prompt = usePrompt();

  const typeDict: Record<StoragesFieldType, { typeTitle: string }> = {
    [StoragesFieldType.Date]: { typeTitle: 'Дата' },
    [StoragesFieldType.Dates]: { typeTitle: 'Даты' },
    [StoragesFieldType.List]: { typeTitle: 'Список' },
    [StoragesFieldType.Price]: { typeTitle: 'Стоимость' },
  };

  return (
    <>
      <Button
        icon="PlusSign"
        onClick={isOpenModalAtom.do.toggle}
      >
        Создать новое поле
      </Button>

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>Выберите тип нового поля</ModalHeader>
        <ModalBody className="flex flex-col gap-3 *:w-full">
          {MyLib.entries(typeDict).map(([type, { typeTitle }]) => {
            if (excludeFieldTypes?.has(+type)) return;

            return (
              <Button
                key={type}
                onClick={async () => {
                  const title = await prompt(`Название для нового поля с типом ${typeTitle}`, 'Новое поле', typeTitle);
                  if (!title) return;

                  return onAdd(+type, title);
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
