import { defaultComplectConfig } from '#features/broadcast/consts';
import { AlertLineConfig, ScreenBroadcastConfig } from '#features/broadcast/model';
import { DexieDB } from '#shared/lib/DexieDB';

type Store = {
  alertLineConfigs: AlertLineConfig[];
  isDarkMode: boolean;
  broadcastAlertLine: null | string;
  screenBroadcastConfigs: ScreenBroadcastConfig[];
  expands: Set<string>;
};

export const complectIDB = new DexieDB<Store>('complect', {
  alertLineConfigs: { id: '++' },
  isDarkMode: [false],
  broadcastAlertLine: [null],
  screenBroadcastConfigs: [[defaultComplectConfig]],
  expands: [new Set()],
});
