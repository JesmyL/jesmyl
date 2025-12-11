import { SortDirection } from '#shared/model/sortDirection';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { storagesSortAndGroupAtom } from '$storages/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { itNNull } from 'shared/utils';

type DropdownItem = { title: string; id: keyof StoragesRackCard | number };

const sortFields: DropdownItem[] = [
  { title: 'Название', id: 'title' },
  { title: 'Заметка', id: 'note' },
];
const groupFields: DropdownItem[] = [{ title: 'Статус', id: 'status' }];
const sortableColumnTypesSet = new Set([
  StoragesColumnType.Link,
  StoragesColumnType.Number,
  StoragesColumnType.String,
  StoragesColumnType.Text,
]);

export const StoragesRackCardSortAndGroupsModalInner = (props: { rack: StoragesRack }) => {
  const sorts = useAtomValue(storagesSortAndGroupAtom)[props.rack.w];
  const columnFields = props.rack.cols
    .map((col, coli) => (sortableColumnTypesSet.has(col.t) ? { title: col.title, id: coli } : null))
    .filter(itNNull);

  return (
    <>
      <ModalHeader>
        Сортировка и группировка в стеллаже <span className="text-x7">{props.rack.title}</span>
      </ModalHeader>
      <ModalBody className="flex flex-col gap-4 custom-align-items">
        <Dropdown
          label="Группировка"
          id={sorts?.group}
          undTitle="Нет"
          items={groupFields.concat(columnFields)}
          onSelectId={value => {
            storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/group`, value, { [props.rack.w]: {} });
          }}
        />

        <Dropdown
          label="Сортировка"
          id={sorts?.sort}
          undTitle="Нет"
          items={sortFields.concat(groupFields, columnFields)}
          onSelectId={value => {
            storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/sort`, value, { [props.rack.w]: {} });
          }}
        />

        <Dropdown
          label="Направление сортировки"
          id={sorts?.dir}
          disabled={sorts?.sort == null}
          undTitle="Нет"
          items={[
            { id: SortDirection.Asc, title: 'По возрастанию' },
            { id: SortDirection.Desc, title: 'По убыванию' },
          ]}
          onSelectId={value => {
            storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/dir`, value, { [props.rack.w]: {} });
          }}
        />
      </ModalBody>
    </>
  );
};
