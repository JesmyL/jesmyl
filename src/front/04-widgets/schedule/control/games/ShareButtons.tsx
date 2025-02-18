import { indexIDB } from '#basis/lib/idb/index/index';
import { schPhotosSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { ScheduleWidgetPhotoKey } from 'shared/api';
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
      <LazyIcon
        className="pointer"
        icon="Eye"
        onClick={() => setIsOpenGalery(true)}
      />
      <TheIconSendButton
        icon="CloudUpload"
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
      <TheIconSendButton
        icon="CloudDownload"
        onSuccess={photos => indexIDB.db.schedulePhotos.bulkPut(photos)}
        onSend={() => schPhotosSokiInvocatorClient.getSharedPhotos(null, rights.schedule.w)}
      />
    </div>
  );
};
