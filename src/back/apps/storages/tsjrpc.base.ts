import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  StoragesTsjrpcModel,
  StoragesTsjrpcRackCardFieldSelector,
  StoragesTsjrpcRackCardSelector,
  StoragesTsjrpcRackSelector,
  StoragesTsjrpcRackStatusSelector,
} from 'shared/api/tsjrpc/storages/tsjrpc.model';
import {
  StoragesRack,
  StoragesRackCard,
  StoragesRackCardMi,
  StoragesRackMemberRole,
  StoragesRackStatus,
} from 'shared/model/storages/list.model';
import {
  StoragesDatesFieldNestedDateFieldMi,
  StoragesFieldNestedSelectors,
  StoragesFieldType,
  StoragesRackDefinitionField,
  StoragesRackField,
} from 'shared/model/storages/rack.model';
import { SMyLib, smylib } from 'shared/utils';
import {
  storagesCheckRackCardFieldValueOnType,
  storagesFieldValueDefaultValueDict,
} from 'shared/utils/storages/checkRackCardFieldValueOnType';
import { storagesDirStore } from './file-stores';
import { storagesStoresSharesServerTsjrpcMethods } from './tsjrpc.shares';

export const storagesServerTsjrpcBase = new (class Storages extends TsjrpcBaseServer<StoragesTsjrpcModel> {
  constructor() {
    super({
      scope: 'Storages',
      methods: {
        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'storages', 'LIST')) throw '';
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
          rack.list.push({
            mi: smylib.takeNextMi(rack.list, StoragesRackCardMi.min),
            title: 'Новая карточка',
          });
        }),

        createRackStatus: updateRack((rack, { title }) => {
          rack.statuses.push({ title });
        }),

        createRackDefinitionField: updateRack((rack, { title, newFieldType, fieldi }) => {
          if (fieldi != null) {
            rack.fields[fieldi].fields ??= [];
            rack.fields[fieldi].fields.push({ t: newFieldType, title });
          } else rack.fields.push({ t: newFieldType, title });
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

        createRackCardDatesFieldDate: updateRackCardField((cardField, { timestamp }) => {
          if (cardField.t !== StoragesFieldType.Dates) throw 'Field type error 761564128398';

          timestamp ??= new Date().setHours(0, 0, 0, 0) / 100000;

          cardField.val ??= [];
          cardField.val.push({
            fields: [],
            mi: smylib.takeNextMi(cardField.val, StoragesDatesFieldNestedDateFieldMi.min),
            ts: timestamp,
          });
        }),

        editRackCardFieldValue: updateRackCardField((cardField, { value }) => {
          cardField.val = storagesCheckRackCardFieldValueOnType(cardField.t, value);
        }),

        toggleRackCardListFieldValue: updateRackCardOrNestedField((fieldsHolder, fieldi, { title }, fieldType) => {
          if (fieldType !== StoragesFieldType.List) return;

          fieldsHolder.fields ??= [];
          const cardField = (fieldsHolder.fields[fieldi] ??= { t: fieldType, val: [] });

          if (cardField.t !== StoragesFieldType.List) return;
          const titlesSet = new Set(cardField.val);

          if (titlesSet.has(title)) titlesSet.delete(title);
          else titlesSet.add(title);

          cardField.val = Array.from(titlesSet).sort();
        }),

        addRackValue: updateRack((rack, { title }) => {
          const valuesSet = new Set(rack.values);
          valuesSet.add(title);
          rack.values = Array.from(valuesSet).sort();
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
    const card = rack.list.find(card => card.mi === props.cardMi);
    if (card == null) throw `There is no card with mi === ${props.cardMi}`;
    return updater(card, props, rack);
  });
}

function updateRackCardOrNestedField<
  Props extends StoragesTsjrpcRackCardSelector & StoragesFieldNestedSelectors,
  RetValue,
  Ret extends UpdaterReturnType<RetValue>,
>(
  updater: (
    fieldsHolder: { fields?: (StoragesRackField<StoragesFieldType> | nil)[] },
    fieldi: number,
    props: Props,
    fieldType: StoragesFieldType,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    if (props.fieldi == null) throw 'Error fieldi is missed in props';

    if (props.nestedFieldi == null || props.nestedFieldMi == null)
      return updater(card, props.fieldi, props, rack.fields[props.fieldi].t, card, rack);

    const rackType = rack.fields[props.fieldi].fields?.[props.nestedFieldi].t;
    if (rackType == null) throw 'Error 1920936712490123';

    card.fields ??= [];
    const cardField = card.fields[props.fieldi];
    if (!smylib.isArr(cardField?.val)) throw 'Error 1872635415624';
    const fieldsHolder = cardField.val.find(it => smylib.isObj(it) && it.mi === props.nestedFieldMi);
    if (!smylib.isObj(fieldsHolder)) throw 'Error 192644527841210';

    return updater(fieldsHolder, props.nestedFieldi, props, rackType, card, rack);
  });
}

function updateRackCardField<
  Props extends StoragesTsjrpcRackCardFieldSelector,
  RetValue,
  Ret extends UpdaterReturnType<RetValue>,
>(
  updater: (
    cardField: StoragesRackField<StoragesFieldType>,
    props: Props,
    rackField: StoragesRackDefinitionField,
    card: StoragesRackCard,
    rack: StoragesRack,
  ) => Ret,
) {
  return updateRackCard<Props, RetValue, Ret>((card, props, rack) => {
    const rackField = rack.fields[props.fieldi];
    if (rackField == null) throw 'Error 8156124357234';

    card.fields ??= [];
    const cardField = (card.fields[props.fieldi] ??= storagesFieldValueDefaultValueDict[rackField.t]);

    if (rackField.t !== cardField.t) throw 'Incorrect card type 162535678729';

    return updater(cardField, props, rackField, card, rack);
  });
}
