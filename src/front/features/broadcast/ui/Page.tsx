import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastFollowInitialSlide } from '$cm/features/broadcast/ui/FollowInitialSlide';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { configureAtomaric, useAtomValue } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { broadcastNextLiveDataAtom } from '../atoms';
import '../style/style.css';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

export const PresentationPage = () => {
  const { data: liveData, schw } = useAtomValue(broadcastNextLiveDataAtom);

  return (
    <div className="absolute w-full h-full bg-black">
      {liveData.isShowInitialSlide ? (
        <CmBroadcastFollowInitialSlide schw={schw} />
      ) : (
        liveData.isHide ||
        (liveData.cm ? (
          <CmBroadcastLiveScreen
            {...liveData.cm}
            isForceSlideMode
          />
        ) : (
          liveData.bible != null && <BibleBroadcastSlide {...liveData.bible} />
        ))
      )}
    </div>
  );
};
