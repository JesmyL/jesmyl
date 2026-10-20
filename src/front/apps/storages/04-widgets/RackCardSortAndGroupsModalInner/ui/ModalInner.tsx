import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { StoragesWithRack } from '$storages/entities/WithRack';
import { storagesSortAndGroupAtom } from '$storages/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { SortDirection } from 'shared/model/common';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { itNNull } from 'shared/utils';
import { checkIsNumber } from 'shared/utils/checkIs';

type DropdownItem = { title: string; id: keyof StoragesRackCard | number };

const makeSortFields = (): DropdownItem[] => [
  { title: translateBase(BaseLocaleKey.Name), id: 'title' },
  { title: translateBase(BaseLocaleKey.StoragesNote), id: 'note' },
];
const makeGroupFields = (): DropdownItem[] => [
  { title: translateBase(BaseLocaleKey.StoragesStatus), id: 'status' },
];
const sortableColumnTypesSet = new Set([
  StoragesColumnType.Link,
  StoragesColumnType.Number,
  StoragesColumnType.String,
  StoragesColumnType.Text,
]);

export const StoragesRackCardSortAndGroupsModalInner = (props: { rack: StoragesRack }) => {
  const rackSortRules = useAtomValue(storagesSortAndGroupAtom)[props.rack.w];
  const columnFields = props.rack.cols
    .map((col, coli) => (sortableColumnTypesSet.has(col.t) ? { title: col.title, id: coli } : null))
    .filter(itNNull);

  return (
    <>
      <ModalHeader>{translateBase(BaseLocaleKey.StoragesSumAndGroupOf, { t: props.rack.title })}</ModalHeader>
      <ModalBody className="flex flex-col gap-4 custom-align-items">
        {props.rack.parent != null && (
          <IconCheckbox
            checked={checkIsNumber(rackSortRules)}
            postfix={
              <>
                {translateBase(BaseLocaleKey.StoragesUseRules)}
                <span className="text-x7">
                  <StoragesWithRack rackw={props.rack.parent}>{rack => rack.title}</StoragesWithRack>
                </span>
              </>
            }
            onChange={() =>
              storagesSortAndGroupAtom.do.setPartial({
                [props.rack.w]: checkIsNumber(rackSortRules) ? undefined : props.rack.parent,
              })
            }
          />
        )}

        {checkIsNumber(rackSortRules) || (
          <>
            <Dropdown
              label={translateBase(BaseLocaleKey.StoragesGrouping)}
              id={rackSortRules?.group}
              undTitle={translateBase(BaseLocaleKey.StoragesNone)}
              items={makeGroupFields().concat(columnFields)}
              onSelectId={value => {
                storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/group`, value, { [props.rack.w]: {} });
              }}
            />

            <Dropdown
              label={translateBase(BaseLocaleKey.StoragesSorting)}
              id={rackSortRules?.sort}
              undTitle={translateBase(BaseLocaleKey.StoragesNone)}
              items={makeSortFields().concat(makeGroupFields(), columnFields)}
              onSelectId={value => {
                storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/sort`, value, { [props.rack.w]: {} });
              }}
            />

            <Dropdown
              label={translateBase(BaseLocaleKey.StoragesSortDirection)}
              id={rackSortRules?.dir}
              disabled={rackSortRules?.sort == null}
              undTitle={translateBase(BaseLocaleKey.StoragesNone)}
              items={[
                { id: SortDirection.Asc, title: translateBase(BaseLocaleKey.StoragesAscending) },
                { id: SortDirection.Desc, title: translateBase(BaseLocaleKey.StoragesDescending) },
              ]}
              onSelectId={value => {
                storagesSortAndGroupAtom.do.setDeepPartial(`${props.rack.w}/dir`, value, { [props.rack.w]: {} });
              }}
            />
          </>
        )}
      </ModalBody>
    </>
  );
};
