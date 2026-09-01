import { CmShowChordedSlideModeSelector } from '$cm/entities/ShowChordedSlideModeSelector';
import { CmBroadcastShowNlNameSpaceSelector } from '$cm/ext';

export const CmBroadcastDropdowns = () => {
  return (
    <>
      <CmShowChordedSlideModeSelector />
      <CmBroadcastShowNlNameSpaceSelector />
    </>
  );
};
