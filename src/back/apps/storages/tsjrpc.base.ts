import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { StoragesTsjrpcModel } from 'shared/api/tsjrpc/storages/tsjrpc.model';
import {
  StoragesRack,
  StoragesRackCard,
  StoragesRackCardMi,
  StoragesRackMemberRole,
  StoragesRackStatus,
  StoragesRackWid,
} from 'shared/model/storages/list.model';
import { SMyLib, smylib } from 'shared/utils';
import { storagesDirStore } from './file-stores';
import { storagesStoresSharesServerTsjrpcMethods } from './tsjrpc.shares';

export const storagesServerTsjrpcBase = new (class Storages extends TsjrpcBaseServer<StoragesTsjrpcModel> {
  constructor() {
    const updateRack =
      <Props extends { rackw: StoragesRackWid }>(
        updater: (rack: StoragesRack, props: Props) => void | nil | { description: string },
      ) =>
      async (props: Props) => {
        let description: string | nil | void = null;

        const { item: rack, mod } = storagesDirStore.updateItem(
          props.rackw,
          rack => (description = updater(rack, props)?.description),
        );

        storagesStoresSharesServerTsjrpcMethods.refreshRacks(
          { maxMod: mod, racks: [rack] },
          { logins: SMyLib.keys(rack.team) },
        );

        return { description };
      };

    const updateRackStatus = <Props extends { rackw: StoragesRackWid; statusi: number }>(
      updater: (status: StoragesRackStatus, props: Props, rack: StoragesRack) => void | nil | { description: string },
    ) =>
      updateRack<Props>((rack, props) => {
        const status = rack.statuses[props.statusi];
        if (status == null) throw `There is no status by ${props.statusi} index`;
        return updater(status, props, rack);
      });

    const updateRackCard = <Props extends { rackw: StoragesRackWid; cardMi: StoragesRackCardMi }>(
      updater: (status: StoragesRackCard, props: Props, rack: StoragesRack) => void | nil | { description: string },
    ) =>
      updateRack<Props>((rack, props) => {
        const card = rack.list.find(card => card.mi === props.cardMi);
        if (card == null) throw `There is no card with mi === ${props.cardMi}`;
        return updater(card, props, rack);
      });

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

        createRackField: updateRack((rack, { title, type }) => {
          rack.fields.push({ t: type, title });
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
      },
    });
  }
})();
