import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { configureAtomaric } from 'atomaric';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { broadcastConnectionDto } from '../lib/connection.dto';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

export const PresentationPage = () => {
  const [liveData, setLiveData] = useState<IndexSchWBroadcastLiveDataValue>({ fio: '', isHide: true });
  const [isHide, setIsHide] = useState(false);

  useEffect(() => broadcastConnectionDto.subscribeEffect(setLiveData, setIsHide), []);

  return (
    <div className="absolute w-full h-full bg-black">
      {isHide ||
        (liveData.cm != null ? (
          <CmBroadcastLiveScreen
            {...liveData.cm}
            isForceSlideMode
          />
        ) : (
          liveData.bible != null && <BibleBroadcastSlide {...liveData.bible} />
        ))}
    </div>
  );
};
