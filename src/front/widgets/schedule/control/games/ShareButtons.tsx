import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schPhotosSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { getScheduleWidgetUserPhotoStorageKey } from '#widgets/schedule/storage';
import { indexIDB } from '$index/db/index-idb';
import { atom } from 'atomaric';
import { ScheduleWidgetPhotoKey } from 'shared/api';
import { ScheduleWidgetPhotoGalery } from './PhotoGalery';
import { checkIsUserPhotoable } from './utils';

interface Props {
  prefix?: React.ReactNode;
}

const isOpenGaleryAtom = atom(false);

export const ScheduleWidgetShareButtons = function ShareButtons({ prefix }: Props) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <div className="flex flex-gap">
      {prefix}

      <LazyIcon
        className="pointer"
        icon="Eye"
        onClick={isOpenGaleryAtom.toggle}
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

          return schPhotosSokiInvocatorClient.putSharedPhotos({ schw: rights.schedule.w, photoDict: value });
        }}
      />
      <TheIconSendButton
        icon="CloudDownload"
        onSuccess={photos => indexIDB.db.schedulePhotos.bulkPut(photos)}
        onSend={() => schPhotosSokiInvocatorClient.getSharedPhotos({ schw: rights.schedule.w })}
      />

      <Modal openAtom={isOpenGaleryAtom}>
        <ScheduleWidgetPhotoGalery />
      </Modal>
    </div>
  );
};
