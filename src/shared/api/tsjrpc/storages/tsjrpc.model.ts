import { SokiAuthLogin } from 'shared/api/complect/soki.model';
import { storagesStylePropKeysMatrix } from 'shared/const/storages/styleProps.config';
import {
  StoragesRack,
  StoragesRackCard,
  StoragesRackCardMi,
  StoragesRackMember,
  StoragesRackSummary,
  StoragesRackSummaryMi,
  StoragesRackWid,
} from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnCustomProperties,
  StoragesColumnType,
  StoragesNestedCellSelectors,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { StoragesColumnUiDict, StoragesColumnUiListKey } from 'shared/model/storages/ui.model';

export type StoragesTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  createRack: (args: { title: string }) => { rack: StoragesRack; lastModfiedAt: number };
  renameRack: (args: RackSelector & { title: string }) => void;
  setRackIcon: (args: RackSelector & { icon: KnownStameskaIconName }) => void;

  createRackCard: (args: RackSelector) => StoragesRackCardMi;
  addRackMember: (args: RackSelector & { member: StoragesRackMember; login: SokiAuthLogin }) => void;
  addManyCards: (args: RackSelector & { cards: StoragesRackCard<string>[] }) => void;
  setRackCardStatus: (args: StoragesTsjrpcRackStatusSelector & StoragesTsjrpcRackCardSelector) => void;
  editRackCardTitle: (args: StoragesTsjrpcRackCardSelector & { title: string }) => void;

  toggleListCellValue: (args: StoragesTsjrpcCellSelector & StoragesNestedCellSelectors & { title: string }) => void;

  editRackCardNote: (args: StoragesTsjrpcRackCardSelector & { note: string }) => void;
  editRackCardMeta: (args: StoragesTsjrpcRackCardSelector & { meta: string }) => void;

  createDatesNestedCell: (args: StoragesTsjrpcCellSelector) => void;
  createRackDict: (args: RackSelector & { title: string }) => void;

  editNestedCellProp: (
    args: StoragesTsjrpcCellSelector &
      StoragesNestedCellSelectors & { partialProps: object; sortRow?: { prop: string; asc: boolean } },
  ) => void;

  editCellValue: (
    args: StoragesTsjrpcCellSelector & StoragesNestedCellSelectors & { value: StoragesCell<StoragesColumnType>['val'] },
  ) => void;

  createRackStatus: (args: RackSelector & { title: string }) => void;

  createColumn: (
    args: RackSelector &
      StoragesNestedCellSelectors & {
        title: string;
        newColumnType: StoragesColumnType;
        colCustomProps: Partial<{ [Type in StoragesColumnType]: StoragesColumnCustomProperties<Type> }>;
      },
  ) => void;

  editRackStatusIcon: (args: StoragesTsjrpcRackStatusSelector & { icon: KnownStameskaIconName }) => void;
  editRackStatusColor: (args: StoragesTsjrpcRackStatusSelector & { color: string }) => void;
  toggleRackStatusNexti: (args: StoragesTsjrpcRackStatusSelector & { nextStatusi: number }) => void;
  editRackStatusTitle: (args: StoragesTsjrpcRackStatusSelector & { title: string }) => void;

  setNumber: (args: StoragesTsjrpcCellSelector & { amount: number }) => void;
  setRackAsParent: (args: StoragesTsjrpcRackSelector & { parentRackw: StoragesRackWid }) => void;

  editColumnType: (
    args: StoragesTsjrpcRackSelector & {
      list?: {
        key: keyof typeof storagesStylePropKeysMatrix;
        value: StoragesColumnUiListKey | nil;
      };
      dict?: Partial<StoragesColumnUiDict>;
      coli: number;
    },
  ) => void;

  renameColumn: (
    args: StoragesTsjrpcRackSelector & StoragesNestedCellSelectors & { title: string; coli: number },
  ) => void;
  moveColumn: (args: StoragesTsjrpcRackSelector & { coli: number; newi: number | nil }) => void;
  editColumnFields: (
    args: StoragesTsjrpcRackSelector &
      StoragesNestedCellSelectors & {
        coli: number;
        data: Partial<{
          [Type in StoragesColumnType]: Partial<OmitOwn<StoragesRackColumn<Type>, 'cols' | 't' | 'uid' | 'uil'>>;
        }>;
      },
  ) => void;

  addRackSummary: (args: RackSelector & { title: string }) => void;
  putAtRackSummary: (
    args: RackSelector & { put: Partial<OmitOwn<StoragesRackSummary, 'mi'>>; summaryMi: StoragesRackSummaryMi },
  ) => void;
};

type RackSelector = StoragesTsjrpcRackSelector;

export type StoragesTsjrpcRackSelector = { rackw: StoragesRackWid };
export type StoragesTsjrpcRackCardSelector = StoragesTsjrpcRackSelector & { cardMi: StoragesRackCardMi };
export type StoragesTsjrpcCellSelector = StoragesTsjrpcRackCardSelector & { coli: number };
export type StoragesTsjrpcRackStatusSelector = StoragesTsjrpcRackSelector & { statusi: number };
