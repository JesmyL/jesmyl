import { CmBroadcastCurrentComTrackScreen } from '$cm/widgets/broadcast';

export const CmPlayerBroadcast = () => {
  return (
    <div className="flex justify-center bg-black absolute inset-0 justify-center text-white *:text-white">
      <CmBroadcastCurrentComTrackScreen
        win={window}
        configi={0}
      />
    </div>
  );
};
