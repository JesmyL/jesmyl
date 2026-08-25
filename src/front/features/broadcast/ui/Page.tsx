import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { configureAtomaric, useAtomValue } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { broadcastNextLiveDataAtom } from '../atoms';
import '../style/style.css';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

export const PresentationPage = () => {
  const { data: liveData } = useAtomValue(broadcastNextLiveDataAtom);

  return (
    liveData && (
      <div className="absolute w-full h-full bg-black">
        {liveData.isHide ||
          (liveData.cm != null ? (
            <CmBroadcastLiveScreen
              {...liveData.cm}
              isForceSlideMode
            />
          ) : (
            liveData.bible != null && <BibleBroadcastSlide {...liveData.bible} />
          ))}
      </div>
    )
  );
};
