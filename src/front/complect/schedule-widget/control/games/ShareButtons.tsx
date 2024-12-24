import { mylib } from 'front/utils';
import { useState } from 'react';
import { ScheduleWidgetPhotoKey, SokiSharedKey } from 'shared/api';
import { soki } from '../../../../soki';
import Modal from '../../../modal/Modal/Modal';
import EvaSendButton from '../../../sends/eva-send-button/EvaSendButton';
import IconButton from '../../../the-icon/IconButton';
import { IconCloudDownloadStrokeRounded } from '../../../the-icon/icons/cloud-download';
import { IconCloudUploadStrokeRounded } from '../../../the-icon/icons/cloud-upload';
import { IconEyeStrokeRounded } from '../../../the-icon/icons/eye';
import { getScheduleWidgetUserPhotoStorageKey, scheduleWidgetPhotosStorage } from '../../storage';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import { ScheduleWidgetPhotoGalery } from './PhotoGalery';
import { checkIsUserPhotoable } from './utils';

interface Props {
  prefix?: React.ReactNode;
}

export const ScheduleWidgetShareButtons = function ShareButtons({ prefix }: Props) {
  const rights = useScheduleWidgetRightsContext();
  const [isOpenGalery, setIsOpenGalery] = useState(false);

  return (
    <div className="flex flex-gap">
      {prefix}
      {isOpenGalery && (
        <Modal onClose={setIsOpenGalery}>
          <ScheduleWidgetPhotoGalery />
        </Modal>
      )}
      <IconButton
        Icon={IconEyeStrokeRounded}
        onClick={() => setIsOpenGalery(true)}
      />
      <EvaSendButton
        Icon={IconCloudUploadStrokeRounded}
        onSend={async () => {
          const value: Partial<Record<ScheduleWidgetPhotoKey, string>> = {};
          const users = rights.schedule.ctrl.users;

          for (const user of users) {
            if (!checkIsUserPhotoable(user)) continue;

            const key = getScheduleWidgetUserPhotoStorageKey(user, rights.schedule);
            const photo = await scheduleWidgetPhotosStorage.get(key);

            if (!photo) continue;

            value[key] = photo;
          }

          if (!mylib.keys(value).length) return;

          soki.send({ shareData: { [SokiSharedKey.ScheduleWidgetPhotos as never]: value } }, 'index');
        }}
      />
      <EvaSendButton
        Icon={IconCloudDownloadStrokeRounded}
        onSend={() => {
          return new Promise((resolve, reject) =>
            soki
              .send(
                {
                  getShared: {
                    prefix: '' + rights.schedule.w,
                    key: SokiSharedKey.ScheduleWidgetPhotos,
                  },
                },
                'index',
              )
              .on(resolve, reject),
          );
        }}
      />
    </div>
  );
};
