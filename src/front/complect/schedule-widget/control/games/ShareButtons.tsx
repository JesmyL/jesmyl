import { indexIDB } from 'front/components/index/db/index-idb';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import Modal from '../../../modal/Modal/Modal';
import EvaSendButton from '../../../sends/eva-send-button/EvaSendButton';
import IconButton from '../../../the-icon/IconButton';
import { IconCloudDownloadStrokeRounded } from '../../../the-icon/icons/cloud-download';
import { IconCloudUploadStrokeRounded } from '../../../the-icon/icons/cloud-upload';
import { IconEyeStrokeRounded } from '../../../the-icon/icons/eye';
import { schPhotosSokiInvocatorClient } from '../../invocators/invocators.methods';
import { getScheduleWidgetUserPhotoStorageKey } from '../../storage';
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
          const value = {} as Record<ScheduleWidgetPhotoKey, string>;
          const users = rights.schedule.ctrl.users;

          for (const user of users) {
            if (!checkIsUserPhotoable(user)) continue;

            const key = getScheduleWidgetUserPhotoStorageKey(user, rights.schedule);
            const photo = await indexIDB.db.schedulePhotos.get(key);

            if (!photo?.src) continue;

            value[key] = photo.src;
          }

          if (!mylib.keys(value).length) return;

          return schPhotosSokiInvocatorClient.putSharedPhotos(null, rights.schedule.w, value);
        }}
      />
      <EvaSendButton
        Icon={IconCloudDownloadStrokeRounded}
        onSuccess={photos => indexIDB.db.schedulePhotos.bulkPut(photos)}
        onSend={() => schPhotosSokiInvocatorClient.getSharedPhotos(null, rights.schedule.w)}
      />
    </div>
  );
};
