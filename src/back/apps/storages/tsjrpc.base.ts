import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  StoragesTsjrpcCellSelector,
  StoragesTsjrpcModel,
  StoragesTsjrpcRackCardSelector,
  StoragesTsjrpcRackSelector,
  StoragesTsjrpcRackStatusSelector,
} from 'shared/api/tsjrpc/storages/tsjrpc.model';
import { storagesCellDefaultValueDict } from 'shared/const/storages/cellDefaultValueDict';
import {
  StoragesRack,
  StoragesRackCard,
  StoragesRackCardMi,
  StoragesRackMemberRole,
  StoragesRackStatus,
} from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesNestedCellMi,
  StoragesNestedCellSelectors,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { SMyLib, smylib } from 'shared/utils';
import { storagesCheckCellValueOnType } from 'shared/utils/storages/checkCellValueOnType';
import { storagesDirStore } from './file-stores';
import { storagesStoresSharesServerTsjrpcMethods } from './tsjrpc.shares';

export const storagesServerTsjrpcBase = new (class Storages extends TsjrpcBaseServer<StoragesTsjrpcModel> {
  constructor() {
    super({
      scope: 'Storages',
      methods: {
        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          try {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'storages', 'LIST')) throw '';
          } catch (_e) {
            return;
          }

          const login = auth.login;
          const { items, maxMod } = storagesDirStore.getFreshItems(lastModfiedAt);

          storagesStoresSharesServerTsjrpcMethods.refreshRacks(
            {
              racks: items.filter(rack => rack.team[login]?.role),
              maxMod,
            },
            client,
          );
        },
        createRack: async ({ title }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'storages', 'LIST', 'C')) throw '';
          const login = auth.login;

          const { item, mod } = storagesDirStore.createItem(store => ({
            ...store,
            title,
            team: {
              [login]: {
                fio: auth.fio ?? auth.nick ?? '??',
                role: StoragesRackMemberRole.Creator,
              },
            },
          }));

          return { value: { rack: item, lastModfiedAt: mod } };
        },

        createRackCard: updateRack(rack => {
          rack.cards.push({
            mi: smylib.takeNextMi(rack.cards, StoragesRackCardMi.min),
            title: 'Новая карточка',
          });
        }),

        addManyCards: updateRack((rack, { cards }) => {
          let maxMi = smylib.takeNextMi(rack.cards, StoragesRackCardMi.min);
          const prevTitlesSet = new Set(rack.cards.map(card => card.title));
          let unsavedCards = 0;

          cards.forEach(card => {
            if (!card.title || prevTitlesSet.has(card.title)) {
              unsavedCards++;
              return;
            }

            prevTitlesSet.add(card.title);
            card.mi = maxMi++;
            rack.cards.push(card);
          });

          if (unsavedCards) {
            if (unsavedCards === cards.length) throw 'Не добавлено ни одной карточки';

            throw smylib.declension(
              unsavedCards,
              `Не добавлена ${unsavedCards} карточка`,
              `Не добавлено ${unsavedCards} карточки`,
              `Не добавлено ${unsavedCards} карточек`,
            );
          }
        }),

        createRackStatus: updateRack((rack, { title }) => {
          rack.statuses.push({ title });
        }),

        createColumn: updateRack((rack, { title, newColumnType, coli: coli }) => {
          if (coli != null) {
            rack.cols[coli].cols ??= [];
            rack.cols[coli].cols.push({ t: newColumnType, title });
          } else rack.cols.push({ t: newColumnType, title });
        }),

        editRackStatusIcon: updateRackStatus((rackStatus, { icon }) => {
          rackStatus.icon = icon;
        }),

        editRackStatusTitle: updateRackStatus((rackStatus, { title }) => {
          rackStatus.title = title;
        }),

        editRackStatusColor: updateRackStatus((rackStatus, { color }) => {
          rackStatus.color = color;
        }),

        toggleRackStatusNexti: updateRackStatus((status, { nextStatusi, statusi }, rack) => {
          status.next ??= rack.statuses.map((_, i) => i).filter(i => i !== statusi);

          if (status.next.includes(nextStatusi)) {
            status.next = status.next.filter(i => i !== nextStatusi);
          } else status.next.push(nextStatusi);

          if (!status.next.length || status.next.length === rack.statuses.length - 1) {
            delete status.next;
          }
        }),

        setRackCardStatus: updateRackCard((card, { statusi }) => {
          card.status = statusi || undefined;
        }),

        editRackCardTitle: updateRackCard((card, { title }) => {
          card.title = title || card.title;
        }),

        editRackCardNote: updateRackCard((card, { note }) => {
          card.note = note || undefined;
        }),

        editRackCardMeta: updateRackCard((card, { meta }) => {
          card.meta = meta || undefined;
        }),

        createDatesNestedCell: updateCell(cell => {
          if (cell.t !== StoragesColumnType.Dates) throw 'Cell type error 761564128398';

          cell.row ??= [];
          let ts = undefined;

          const todayTs = new Date().setHours(0, 0, 0, 0) / 100000;
          if (!cell.row.some(it => it.ts === todayTs)) {
            ts = Math.trunc(new Date().setHours(0, 0, 0, 0) / 100000);
          }

          cell.row.push({
            row: [],
            mi: smylib.takeNextMi(cell.row, StoragesNestedCellMi.min),
            ts,
          });
        }),

        editNestedCellProp: updateCell((cell, props) => {
          if (!('row' in cell) || !smylib.isArr(cell.row) || props.nestedCellMi == null) return;

          const nestedCell = cell.row.find(cell => cell.mi === props.nestedCellMi);
          if (nestedCell == null) return;

          smylib.keys(props.partialProps).forEach(key => {
            nestedCell[key] = props.partialProps[key];
          });

          if (props.sortRow != null) {
            const by = props.sortRow.prop as never;
            const sort = (a: object, b: object) =>
              a[by] == null
                ? b[by] == null
                  ? 0
                  : -1
                : b[by] == null
                  ? 1
                  : +a[by] - +b[by] || (`${a}` > `${b}` ? 1 : `${a}` < `${b}` ? -1 : 0);

            cell.row.sort(props.sortRow.asc ? (b, a) => sort(a, b) : (a, b) => sort(b, a));
          }
        }),

        editCellValue: updateCell((cell, { value }) => {
          cell.val = storagesCheckCellValueOnType(cell.t, value);
        }),

        toggleListCellValue: updateCellOrNestedCell((rowHolder, index, { title }, colType) => {
          if (colType !== StoragesColumnType.List) return;

          rowHolder.row ??= [];
          const cell = (rowHolder.row[index] ??= { t: colType, val: [] });

          if (cell.t !== StoragesColumnType.List) return;
          const titlesSet = new Set(cell.val);

          if (titlesSet.has(title)) titlesSet.delete(title);
          else titlesSet.add(title);

          cell.val = Array.from(titlesSet).sort();
        }),

        addRackValue: updateRack((rack, { title }) => {
          const valuesSet = new Set(rack.values);
          valuesSet.add(title);
          rack.values = Array.from(valuesSet).sort();
        }),

        setNumber: updateCellOrNestedCell((rowHolder, index, props, colType) => {
          if (colType != StoragesColumnType.Number) return;
          rowHolder.row ??= [];
          const cell = (rowHolder.row[index] ??= { t: colType, val: 0 });
          if (cell?.t !== StoragesColumnType.Number) return;

          cell.val = props.amount;
        }),
      },
    });
  }
})();

type UpdaterReturnType<RetValue> = und | void | { description?: string; value: RetValue };

function updateRack<Props extends StoragesTsjrpcRackSelector, RetValue, Ret extends UpdaterReturnType<RetValue>>(
  updater: (rack: StoragesRack, props: Props) => Ret,
) {
  return async (props: Props): Promise<Ret> => {
    let ret: Ret = undefined!;

    const { item: rack, mod } = storagesDirStore.updateItem(props.rackw, rack => {
      ret = updater(rack, props);
    });

    storagesStoresSharesServerTsjrpcMethods.refreshRacks(
      { maxMod: mod, racks: [rack] },
      { logins: SMyLib.keys(rack.team) },
    );

    return ret;
  };
}

function updateRackStatus<
  Props extends StoragesTsjrpcRackStatusSelector,
  RetValue,
  Ret extends UpdaterReturnType<RetValue>,
>(updater: (status: StoragesRackStatus, props: Props, rack: StoragesRack) => Ret) {
  return updateRack<Props, RetValue, Ret>((rack, props) => {
    const status = rack.statuses[props.statusi];
    if (status == null) throw `There is no status by ${props.statusi} index`;
    return updater(status, props, rack);
  });
}

function updateRackCard<
  Props extends StoragesTsjrpcRackCardSelector,
  RetValue,
  Ret extends UpdaterReturnType<RetValue>,
>(updater: (card: StoragesRackCard, props: Props, rack: StoragesRack) => Ret) {
  return updateRack<Props, RetValue, Ret>((rack, props) => {
    const card = rack.cards.find(card => card.mi === props.cardMi);
    if (card == null) throw `There is no card with mi === ${props.cardMi}`;
    return updater(card, props, rack);
  });
}

function updateCellOrNestedCell<
  Props extends StoragesTsjrpcRackCardSelector & StoragesNestedCellSelectors,
  RetValue,
  Ret extends UpdaterReturnType<RetValue>,
>(
  updater: (
    rowHolder: { row?: (StoragesCell<StoragesColumnType> | nil)[] },
    celli: number,
    props: Props,
    colType: StoragesColumnType,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    if (props.coli == null) throw 'Error: coli is missed in props';

    if (props.nestedColi == null || props.nestedCellMi == null)
      return updater(card, props.coli, props, rack.cols[props.coli].t, card, rack);

    const rackType = rack.cols[props.coli].cols?.[props.nestedColi].t;
    if (rackType == null) throw 'Error 1920936712490123';

    card.row ??= [];
    const cardCell = card.row[props.coli];
    if (cardCell == null || !('row' in cardCell)) throw 'Error 1862531839123';

    const rowHolder = cardCell.row.find(it => it.mi === props.nestedCellMi);
    if (!smylib.isObj(rowHolder)) throw 'Error 192644527841210';

    return updater(rowHolder, props.nestedColi, props, rackType, card, rack);
  });
}

function updateCell<Props extends StoragesTsjrpcCellSelector, RetValue, Ret extends UpdaterReturnType<RetValue>>(
  updater: (
    cell: StoragesCell<StoragesColumnType>,
    props: Props,
    column: StoragesRackColumn,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    const column = rack.cols[props.coli];
    if (column == null) throw 'Error 8156124357234';

    card.row ??= [];
    const cell = (card.row[props.coli] ??= storagesCellDefaultValueDict()[column.t]);

    if (column.t !== cell.t) throw 'Incorrect card type 162535678729';

    return updater(cell, props, column, card, rack);
  });
}
