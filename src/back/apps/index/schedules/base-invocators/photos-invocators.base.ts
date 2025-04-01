import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import { SchPhotosSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { SMyLib, smylib } from 'shared/utils';
import { scheduleTitleInBrackets } from './general-invocators.base';

const sharedPhotoDict = {} as Record<ScheduleWidgetPhotoKey, string>;

export const schPhotosSokiInvocatorBaseServer =
  new (class SchPhotosSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchPhotosSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchPhotosSokiInvocatorBaseServer',
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
        onEachFeedbackTools: {
          putSharedPhotos: ({ schw }, counts) =>
            `Были отправлены фото для расписания ${scheduleTitleInBrackets(schw)}\n` +
            `Загружено: ${counts.loadedCount}\nНовых: ${counts.addedCount}`,

          getSharedPhotos: ({ schw }, photos) =>
            `Запрос списка фото для расписания ${scheduleTitleInBrackets(schw)}. Отправлено ${photos.length} шт`,
        },
      });
    }
  })();
