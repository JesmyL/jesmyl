import { BroadcastViewApp } from '#features/broadcast/Broadcast.model';
import { defaultComplectConfig } from '#features/broadcast/consts';
import { AlertLineConfig, ScreenBroadcastConfig } from '#features/broadcast/model';
import { DexieDB } from '#shared/lib/DexieDB';

type Store = {
  alertLineConfigs: AlertLineConfig[];
  isDarkMode: boolean;
  currentBroadcastTextApp: BroadcastViewApp;
  broadcastAlertLine: null | string;
  screenBroadcastConfigs: ScreenBroadcastConfig[];
  expands: Set<string>;
};

export const complectIDB = new DexieDB<Store>('complect', {
  alertLineConfigs: { id: '++' },
  isDarkMode: { $byDefault: false },
  currentBroadcastTextApp: { $byDefault: 'cm' },
  broadcastAlertLine: { $byDefault: null },
  screenBroadcastConfigs: { $byDefault: [defaultComplectConfig] },
  expands: { $byDefault: new Set() },
});
