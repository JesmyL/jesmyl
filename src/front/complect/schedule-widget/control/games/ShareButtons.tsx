import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { indexIDB } from 'front/components/index/db/index-idb';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import Modal from '../../../modal/Modal/Modal';
import TheIconSendButton from '../../../sends/the-icon-send-button/TheIconSendButton';
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
