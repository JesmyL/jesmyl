import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import { SchPhotosTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { SMyLib, smylib } from 'shared/utils';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const sharedPhotoDict = {} as Record<ScheduleWidgetPhotoKey, string>;

export const schPhotosTsjrpcBaseServer = new (class SchPhotos extends TsjrpcBaseServer<SchPhotosTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchPhotos',
      methods: {
        putSharedPhotos: async ({ photoDict }) => {
          const loadedCount = smylib.keys(photoDict).length;
          const prevCachedCount = smylib.keys(sharedPhotoDict).length;
          Object.assign(sharedPhotoDict, photoDict);
          const newCachedCount = smylib.keys(sharedPhotoDict).length;

          return { addedCount: newCachedCount - prevCachedCount, loadedCount };
        },

        getSharedPhotos: async ({ schw }) => {
          const keyPrefix = '' + schw;
          const photos: { key: ScheduleWidgetPhotoKey; src: string }[] = [];
          SMyLib.keys(sharedPhotoDict).forEach(key => {
            if (key.startsWith(keyPrefix)) photos.push({ key, src: sharedPhotoDict[key] });
          });

          return photos;
        },
      },
      onEachFeedback: {
        putSharedPhotos: ({ schw }, counts) =>
          `Были отправлены фото для расписания ${scheduleTitleInBrackets(schw)}\n` +
          `Загружено: ${counts.loadedCount}\nНовых: ${counts.addedCount}`,

        getSharedPhotos: ({ schw }, photos) =>
          `Запрос списка фото для расписания ${scheduleTitleInBrackets(schw)}. Отправлено ${photos.length} шт`,
      },
    });
  }
})();
