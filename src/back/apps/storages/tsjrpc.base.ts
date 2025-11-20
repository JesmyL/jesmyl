import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  StoragesTsjrpcCellSelector,
  StoragesTsjrpcModel,
  StoragesTsjrpcRackCardSelector,
  StoragesTsjrpcRackSelector,
  StoragesTsjrpcRackStatusSelector,
} from 'shared/api/tsjrpc/storages/tsjrpc.model';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { storagesStylePropKeysMatrix } from 'shared/const/storages/styleProps.config';
import {
  StoragesRack,
  StoragesRackCard,
  StoragesRackCardMi,
  StoragesRackCore,
  StoragesRackMemberRole,
  StoragesRackStatus,
  StoragesRackStorageSaved,
  StoragesRackTrail,
  StoragesRackWid,
} from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesDictItemi,
  StoragesNestedCellMi,
  StoragesNestedCellSelectors,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { itNNull, SMyLib, smylib } from 'shared/utils';
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
          const racks = items.filter(rack => rack.team[login]?.role);
          let rackwRack: Partial<Record<StoragesRackWid, StoragesRackStorageSaved[]>>;

          if (racks.length)
            storagesStoresSharesServerTsjrpcMethods.refreshRacks(
              {
                racks: racks
                  .map(rack => {
                    if ('parent' in rack) {
                      rackwRack ??= SMyLib.groupBy(racks, rack => rack.w);

                      const parentRack = rackwRack[rack.parent]?.[0] ?? storagesDirStore.getItem(rack.parent);
                      if (!parentRack || 'parent' in parentRack) return null;
                      return { ...parentRack, ...rack };
                    }
                    return rack;
                  })
                  .filter(itNNull),
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

          if ('parent' in item) throw '';

          return { value: { rack: item, lastModfiedAt: mod } };
        },

        addRackMember: updateRack((rack, { login, member }) => {
          rack.team[login] = member;
        }),

        createRackCard: updateRack(rack => {
          const emptyTitleCard = rack.cards.find(card => !card.title);
          if (emptyTitleCard != null) return { value: emptyTitleCard.mi };

          const mi = smylib.takeNextMi(rack.cards, StoragesRackCardMi.min);
          rack.cards.unshift({ mi, title: '' });

          return { value: mi };
        }),

        createRackDict: updateRack((rack, { title }) => {
          rack.dicts.push({ li: [''], title });
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
            rack.cards.push({
              ...card,
              row: card.row?.map((cell, celli): StoragesCell<StoragesColumnType> => {
                if (cell == null || (cell.t !== StoragesColumnType.List && cell.t !== StoragesColumnType.String))
                  return cell!;

                const col = rack.cols[celli];
                const dict = rack.dicts['di' in col ? (col.di ?? 0) : 0];

                if (cell.t === StoragesColumnType.List)
                  return {
                    ...cell!,
                    val: cell.val.map(str => {
                      if (dict == null) return 0;

                      let index = dict.li.indexOf(str);
                      if (index < 0) index = dict.li.push(str) - 1;

                      return index;
                    }),
                  };

                let index = dict.li.indexOf(cell.val);
                if (index < 0) index = dict.li.push(cell.val) - 1;

                return { ...cell, val: index };
              }),
            });
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

        createColumn: updateRack((rack, { title, newColumnType, coli, colCustomProps }) => {
          if (coli != null) {
            rack.cols[coli].cols ??= [];
            rack.cols[coli].cols.push({ t: newColumnType, title, ...colCustomProps[newColumnType] });
          } else {
            rack.cols.push({ t: newColumnType, title, ...colCustomProps[newColumnType] });
            rack.colsOrd?.push(rack.cols.length - 1);
          }
        }),

        moveColumn: updateRack((rack, props) => {
          rack.colsOrd ??= rack.cols.map((_, i) => i);
          rack.colsOrd = smylib.withInsertedBeforei(rack.colsOrd, props.newi ?? rack.colsOrd.length, props.coli);

          let expectedi = 0;
          if (!rack.colsOrd.some(i => i !== expectedi++)) delete rack.colsOrd;
        }),

        editColumnFields: updateRack((rack, props) => {
          if (props.nestedColi != null) {
            const nestedCols = rack.cols[props.coli].cols;
            if (nestedCols == null) return;
            const col = nestedCols[props.nestedColi];

            nestedCols[props.nestedColi] = { ...col, ...(col && props.data[col.t]) };

            return;
          }

          const col = rack.cols[props.coli];
          rack.cols[props.coli] = { ...col, ...props.data[col.t] };
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

        editCellValue: updateCellOrNestedCell(({ rowHolder, columni, colType, colsHolder }, { value }, _, rack) => {
          if (colType == null) return;
          rowHolder.row ??= [];
          const cell = (rowHolder.row[columni] ??= storagesColumnConfigDict[colType].def());
          const typeCell = storagesColumnConfigDict[colType].retCorrectTypeValue(value);

          if (typeCell.t !== StoragesColumnType.String) {
            if (typeCell.t === cell.t) cell.val = typeCell.val as never;
            return;
          }

          const col = colsHolder.cols?.[columni] as StoragesRackColumn<StoragesColumnType.String>;
          if (col == null || col.t !== StoragesColumnType.String) return;
          const dict = rack.dicts[col.di ?? 0];
          cell.val = dict.li.indexOf('' + value);
          if (cell.val < 0) cell.val = dict.li.push('' + value) - 1;
        }),

        toggleListCellValue: updateCellOrNestedCell(
          ({ rowHolder, colType, columni, colsHolder }, { title }, _, rack) => {
            const column = colsHolder.cols?.[columni] as StoragesRackColumn<StoragesColumnType.List>;
            if (column == null || column.t !== StoragesColumnType.List || colType !== StoragesColumnType.List) return;

            rowHolder.row ??= [];
            const cell = (rowHolder.row[columni] ??= { t: colType, val: [] });

            if (cell.t !== StoragesColumnType.List) return;
            const dictList = rack.dicts[column.di ?? 0].li;
            const titleIndexDict: Record<string, StoragesDictItemi> = {};
            const titlesSet = new Set<string>();

            cell.val.forEach(titlei => {
              titlesSet.add(dictList[titlei]);
            });

            dictList.forEach((title, titlei) => {
              titleIndexDict[title] = titlei;
            });

            if (titleIndexDict[title] == null) {
              titleIndexDict[title] = dictList.length;
              dictList.push(title);
            }

            if (titlesSet.has(title)) titlesSet.delete(title);
            else titlesSet.add(title);

            cell.val = Array.from(titlesSet)
              .sort()
              .map(title => titleIndexDict[title]);
          },
        ),

        setNumber: updateCellOrNestedCell(({ rowHolder, columni, colType }, props) => {
          if (colType != StoragesColumnType.Number) return;
          rowHolder.row ??= [];
          const cell = (rowHolder.row[columni] ??= { t: colType, val: 0 });
          if (cell?.t !== StoragesColumnType.Number) return;

          cell.val = props.amount;
        }),

        setRackAsParent: updateRack((rack, { parentRackw }) => {
          if (rack.statuses.length > 1) throw 'Уже существуют собственные статусы';
          if (rack.dicts.length > 1) throw 'Уже существуют собственные словари';
          if (rack.cols.length > 1) throw 'Уже существуют собственные спец. поля';

          rack.parent = parentRackw;
          const partialRack: Partial<StoragesRackTrail> = rack;

          delete partialRack.statuses;
          delete partialRack.dicts;
          delete partialRack.cols;
          delete partialRack.colsOrd;
        }),

        editColumnType: updateRack((rack, props) => {
          if (props.list) {
            const uilSet = new Set(rack.cols[props.coli].uil);
            storagesStylePropKeysMatrix[props.list.key].forEach(key => uilSet.delete(key));
            if (props.list.value != null) uilSet.add(props.list.value);
            rack.cols[props.coli].uil = uilSet.size ? Array.from(uilSet) : undefined;
          }

          if (props.dict) {
            const uid = (rack.cols[props.coli].uid = { ...rack.cols[props.coli].uid, ...props.dict });

            smylib.keys(uid).forEach(key => {
              if (uid[key] == null) delete uid[key];
            });

            if (!smylib.keys(uid).length) delete rack.cols[props.coli].uid;
          }
        }),

        renameColumn: updateRack((rack, props) => {
          rack.cols[props.coli].title = props.title || rack.cols[props.coli].title;
        }),

        renameRack: updateRack((rack, props) => {
          rack.title = props.title || rack.title;
        }),
      },
    });
  }
})();

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

type UpdaterReturnType<RetValue> = und | void | { description?: string; value: RetValue };

const rackCore: PRecord<keyof OmitOwn<StoragesRackCore, 'w'>, 0> = {
  cards: 0,
  icon: 0,
  team: 0,
  title: 0,
};

function updateRack<Props extends StoragesTsjrpcRackSelector, RetValue, Ret extends UpdaterReturnType<RetValue>>(
  updater: (rack: StoragesRack, props: Props) => Ret,
) {
  return async (props: Props, tool: ServerTSJRPCTool): Promise<Ret> => {
    if (throwIfNoUserScopeAccessRight(tool.auth?.login, 'storages', 'LIST', 'U')) throw '';
    const login = tool.auth?.login;
    let ret: Ret = undefined!;
    let parentRack = null as StoragesRackStorageSaved | nil;

    const updated = storagesDirStore.updateItem(props.rackw, rack => {
      if ('parent' in rack) {
        const proxyRack = new Proxy(rack, {
          get: (rack, key) => {
            if (key in rackCore) return rack[key as never];
            parentRack ??= storagesDirStore.getItem(rack.parent) as never;

            if (!parentRack.team[login]?.role) throw 'Нет прав на это действие (изменение в родительском стеллаже)';

            return parentRack?.[key as never];
          },
        });

        ret = updater(proxyRack as never, props);
        if (parentRack != null) storagesDirStore.saveItem(parentRack.w);

        return;
      }

      ret = updater(rack, props);
    });

    if (updated == null) throw 'Error 10961237652345683910';
    const { item, mod } = updated;

    let rack: StoragesRack = null!;

    if (parentRack != null && !('parent' in parentRack))
      storagesStoresSharesServerTsjrpcMethods.refreshRacks(
        { maxMod: mod, racks: [parentRack] },
        { logins: SMyLib.keys(parentRack.team) },
      );

    if ('parent' in item) {
      parentRack ??= storagesDirStore.getItem(item.parent);
      if (parentRack == null || 'parent' in parentRack)
        throw 'Во время формирования дочернего стеллажа обнаружено наследование от другого дочернего стеллажа';
      rack = { ...parentRack, ...item };
    } else rack = item;

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
    holderProps: {
      rowHolder: { row?: (StoragesCell<StoragesColumnType> | nil)[] };
      colsHolder: { cols?: StoragesRackColumn<StoragesColumnType>[] };
      columni: number;
      colType?: StoragesColumnType;
    },
    props: Props,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    if (props.coli == null) throw 'Error: coli is missed in props';

    if (props.nestedColi == null || props.nestedCellMi == null)
      return updater(
        { rowHolder: card, columni: props.coli, colType: rack.cols[props.coli].t, colsHolder: rack },
        props,
        card,
        rack,
      );

    const column = rack.cols[props.coli];
    if (column == null) throw 'Error 1920936712490123';

    card.row ??= [];
    const cardCell = card.row[props.coli];
    if (cardCell == null || !('row' in cardCell)) throw 'Error 1862531839123';

    const rowHolder = cardCell.row.find(it => it.mi === props.nestedCellMi);
    if (!smylib.isObj(rowHolder)) throw 'Error 192644527841210';

    return updater(
      { rowHolder, columni: props.nestedColi, colType: column.cols?.[props.nestedColi].t, colsHolder: column },
      props,
      card,
      rack,
    );
  });
}

function updateCell<Props extends StoragesTsjrpcCellSelector, RetValue, Ret extends UpdaterReturnType<RetValue>>(
  updater: (
    cell: StoragesCell<StoragesColumnType>,
    props: Props,
    column: StoragesRackColumn<StoragesColumnType>,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    const column = rack.cols[props.coli];
    if (column == null) throw 'Error 8156124357234';

    card.row ??= [];
    const cell = (card.row[props.coli] ??= storagesColumnConfigDict[column.t].def());

    if (column.t !== cell.t) throw 'Incorrect card type 162535678729';

    return updater(cell, props, column, card, rack);
  });
}
