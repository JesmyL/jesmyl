import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import { SchPhotosTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const sharedPhotoDict = {} as Record<ScheduleWidgetPhotoKey, string>;

export const schPhotosTsjrpcBaseServer = new (class SchPhotos extends TsjrpcBaseServer<SchPhotosTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchPhotos',
      methods: {
        putSharedPhotos: async ({ photoDict, schw }) => {
          const loadedCount = objectLength(photoDict);
          const prevCachedCount = objectLength(sharedPhotoDict);
          Object.assign(sharedPhotoDict, photoDict);
          const newCachedCount = objectLength(sharedPhotoDict);
          const value = { addedCount: newCachedCount - prevCachedCount, loadedCount };

          return {
            value,
            description:
              `Были отправлены фото для расписания ${scheduleTitleInBrackets(schw)}\n` +
              `Загружено: ${value.loadedCount}\nНовых: ${value.addedCount}`,
          };
        },

        getSharedPhotos: async ({ schw }) => {
          const keyPrefix = '' + schw;
          const photos: { key: ScheduleWidgetPhotoKey; src: string }[] = [];
          objectKeys(sharedPhotoDict).forEach(key => {
            if (key.startsWith(keyPrefix)) photos.push({ key, src: sharedPhotoDict[key] });
          });

          return {
            value: photos,
            description: `Запрос списка фото для расписания ${scheduleTitleInBrackets(schw)}. Отправлено ${photos.length} шт`,
          };
        },
      },
    });
  }
})();
