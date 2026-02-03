import { atom } from 'atomaric';
import { SortDirection } from 'shared/model/common/sortDirection';
import { StoragesRackCard, StoragesRackWid } from 'shared/model/storages/list.model';

export const storagesSortAndGroupAtom = atom<
  Partial<
    Record<
      StoragesRackWid,
      | StoragesRackWid
      | { group: keyof StoragesRackCard | number; sort: keyof StoragesRackCard | number; dir: SortDirection }
    >
  >
>({}, 'storages:sortAndGroupingCards');
