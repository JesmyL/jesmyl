import { SortDirection } from '#shared/model/sortDirection';
import { atom } from 'atomaric';
import { StoragesRackCard, StoragesRackWid } from 'shared/model/storages/list.model';

export const storagesSortAndGroupAtom = atom<
  Partial<
    Record<
      StoragesRackWid,
      { group: keyof StoragesRackCard | number; sort: keyof StoragesRackCard | number; dir: SortDirection }
    >
  >
>({}, 'storages:sortAndGroupingCards');
