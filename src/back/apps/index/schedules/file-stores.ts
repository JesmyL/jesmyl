import { DirStorage } from 'back/complect/DirStorage';
import { FileStore } from 'back/complect/FileStore';
import { ConstantsConfig, IScheduleWidget, IScheduleWidgetWid } from 'shared/api';
import { constantsDefaultConfig } from 'shared/const/cm/constants.def';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';
import { objectKeys } from 'shared/utils/object.utils';

export const schedulesDirStore = new DirStorage<IScheduleWidget, IScheduleWidgetWid, 'w'>({
  dirPath: '/apps/index/schedules/',
  idKey: 'w',
  makeNewItem: takeDefaultScheduleWidget,
});

export const constantsConfigFileStore = new FileStore<ConstantsConfig>(
  '/apps/index/constantsConfig.json',
  constantsDefaultConfig,
);

(() => {
  const config = constantsConfigFileStore.getValue();
  let isConfigChanged = false;

  objectKeys(config).forEach(key => {
    if (constantsDefaultConfig[key] === undefined) {
      delete config[key];
      isConfigChanged = true;
    }
  });

  objectKeys(constantsDefaultConfig).forEach(key => {
    if (config[key] === undefined) {
      config[key] = constantsDefaultConfig[key] as never;
      isConfigChanged = true;
    }
  });

  if (isConfigChanged) constantsConfigFileStore.saveValue();
})();
