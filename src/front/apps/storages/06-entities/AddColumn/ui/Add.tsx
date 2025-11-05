import { Button } from '#shared/components/ui/button';
import { MyLib } from '#shared/lib/my-lib';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { Atom } from 'atomaric';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesAddColumn = ({
  onAdd,
  isOpenModalAtom,
  excludeColumnTypes,
}: {
  onAdd: (type: StoragesColumnType, title: string) => Promise<unknown>;
  isOpenModalAtom: Atom<boolean>;
  excludeColumnTypes?: Set<StoragesColumnType>;
}) => {
  const prompt = usePrompt();

  return (
    <>
      <Button
        icon="PlusSign"
        onClick={isOpenModalAtom.do.toggle}
      >
        Создать новое специальное поле
      </Button>

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>Выберите тип нового специального поля</ModalHeader>
        <ModalBody className="flex flex-col gap-3 *:w-full">
          {MyLib.entries(storagesColumnConfigDict).map(([type, { typeTitle, icon }]) => {
            if (excludeColumnTypes?.has(+type)) return;

            return (
              <Button
                key={type}
                icon={icon}
                onClick={async () => {
                  const title = await prompt(`Название для нового поля с типом ${typeTitle}`, 'Новое поле', typeTitle);
                  if (!title) return;
                  isOpenModalAtom.reset();

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
