import { BibleBroadcastSlide } from '$bible/entities/broadcast';
import { CmBroadcastFollowInitialSlide } from '$cm/features/broadcast/ui/FollowInitialSlide';
import { CmBroadcastLiveScreen } from '$cm/features/broadcast/ui/Screen';
import { configureAtomaric, useAtomValue } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { broadcastNextLiveDataAtom } from '../atoms';
import { PresentationBroadcastSlide } from './PresentationScreen';
import '../style/style.css';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

export const PresentationPage = () => {
  const { data, schw } = useAtomValue(broadcastNextLiveDataAtom);
  const presentations = data.presentations;
  const presentationSlide =
    presentations && (presentations.slides.find(slide => slide.slid === presentations.slid) ?? presentations.slides[0]);
  const viewApp = data.app;
  const isBible = viewApp === 'bible' || (viewApp == null && data.bible != null);
  const isPresentations = viewApp === 'presentations' || (viewApp == null && presentations != null);
  const content = isPresentations
    ? presentations && presentationSlide && (
        <PresentationBroadcastSlide
          {...presentationSlide}
          config={presentations.config}
        />
      )
    : isBible
      ? data.bible != null && <BibleBroadcastSlide {...data.bible} />
      : data.cm != null && <CmBroadcastLiveScreen {...data.cm} isForceSlideMode />;

  return (
    <div className="absolute w-full h-full bg-black">
      {data.isShowInitialSlide ? (
        <CmBroadcastFollowInitialSlide schw={schw} />
      ) : (
        data.isHide || content
      )}
    </div>
  );
};
