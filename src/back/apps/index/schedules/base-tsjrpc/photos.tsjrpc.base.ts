import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
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
            description: backLocaleError(BackLocaleKey.SchPhotosUploaded, {
              t: await scheduleTitleInBrackets(schw),
              l: value.loadedCount,
              n: value.addedCount,
            }),
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
            description: backLocaleError(BackLocaleKey.SchPhotosRequested, {
              t: await scheduleTitleInBrackets(schw),
              n: photos.length,
            }),
          };
        },
      },
    });
  }
})();
