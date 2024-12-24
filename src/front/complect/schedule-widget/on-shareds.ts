import { soki } from 'front/soki';
import { MyLib } from 'front/utils';
import { SokiSharedKey } from 'shared/api';
import { scheduleWidgetPhotosStorage } from './storage';

export const listenSokiEventsForScheduleWidgets = () => {
  soki.onEventServerListen('index', event => {
    if (event.sharedData === undefined) return;
    const value = event.sharedData[SokiSharedKey.ScheduleWidgetPhotos];
    if (value == null) return;

    MyLib.entries(value).forEach(([key, val]) => scheduleWidgetPhotosStorage.set(key, val));
  });
};
